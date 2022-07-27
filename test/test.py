
import os


import joblib 
import pandas as pd
import sklearn
import category_encoders
cur_dir = os.path.dirname(__file__)
linreg_Aug_2_fit = joblib.load(open(os.path.join(cur_dir,'linreg_Aug_2_fit.joblib'),'rb'))
linreg_Aug_2 = joblib.load(open(os.path.join(cur_dir,'linreg_Aug_2.joblib'),'rb'))

loaded_model = joblib.load(open(os.path.join(cur_dir,'linreg_Aug_2.joblib'),'rb'))
loaded_fit = joblib.load(open(os.path.join(cur_dir,'linreg_Aug_2_fit.joblib'),'rb'))

input_df = pd.DataFrame(columns = [
  'lineid','arrival_time_T','departure_time_T','planned_arr_L','stop_id','day','temp','humidity','wind_speed','hour','nathols' 
]
)

input = [999,701.30,630.6,630.6,'8220DB00234',5,5.96,75,9.26,10,0]

input_df.loc[len(input_df)] = input

print(input_df)

fitted_df = loaded_fit.transform(input_df)
print(loaded_model.predict(fitted_df))