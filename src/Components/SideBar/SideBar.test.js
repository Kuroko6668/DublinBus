import { render, fireEvent, screen } from "@testing-library/react";
import SideBar from ".";

//test block
describe("Tset for the sideBar Component",()=>{
    test("Planner button click", () => {
        // render the component on virtual dom
        render(<SideBar />);
        
        //select the elements you want to interact with
        const planner = screen.getByTestId('plannerButton');
        const plannerButton = screen.queryByText('Planner')
        
        //interact with those elements
        fireEvent.click(planner);
        
        //assert the expected result
        expect(plannerButton).toBeInTheDocument()
        }),
        test("Near me button click", () => {
            // render the component on virtual dom
            render(<SideBar />);
            
            //select the elements you want to interact with
            const planner = screen.getByTestId('plannerButton');
            const NearMe = screen.queryByText('Near Me')
            
            //interact with those elements
            fireEvent.click(planner);
            
            //assert the expected result
            expect(NearMe).toBeInTheDocument()
            }),
            test("Search Route button click", () => {
                // render the component on virtual dom
                render(<SideBar />);
                
                //select the elements you want to interact with
                const planner = screen.getByTestId('plannerButton');
                const SearchRoute = screen.queryByText('Search Route')
                
                //interact with those elements
                fireEvent.click(planner);
                
                //assert the expected result
                expect(SearchRoute).toBeInTheDocument()
                })
    });
    