
import React,{Component, useRef, useState} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DisplayStops from '../../../DisplayStops';
import { useStops } from '../../../../Providers/StopsContext';


export default function DisplayRoutes(props) {
    const {panel} = props
    console.log(props);
    var cnt = 0
    const {data:stops}  = useStops();

  return (
    <div>
        {panel.map((step)=>{return step.travel_mode==="WALKING"?(
            <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              key={Math.random().toString()}
            >
              <Typography>{"Walk"}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                 {step.instructions}
              </Typography>
              <Typography>
                 Take {Math.ceil(step.duration/60)} mins
              </Typography>
              <Typography>
                 About {step.distance} m away
              </Typography>
            </AccordionDetails>
          </Accordion>      
        ):(
        <>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            key={Math.random().toString()}
          >
            <Typography>{"Bus "+step.short_name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
               {step.long_name}
            </Typography>
            <Typography>
               {"Take bus at "+step.departure_stop+" at "+step.departure_text}
            </Typography>
            <Typography>
               {"You will arrive at "+step.arrival_stop+" at "+step.arrival_time_text}
            </Typography>
            <Typography>
               {"The journey will take "+Math.ceil(step.duration/60)+" mins"}
            </Typography>
            <Typography>
               {step.prediction_journey_time>0?"Our prediction journey time is "+Math.ceil(step.prediction_journey_time)+" mins":null}
            </Typography>
          </AccordionDetails>
        </Accordion>  
        <DisplayStops stops={step.trip_stops}/>    
        </>
        )
      })}
      
    </div>
  );
}