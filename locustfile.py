from locust import HttpUser, task,TaskSet, events, between
# from django.contrib.auth.models import User
from random import randint



class public_endpoints(HttpUser):
    @task
    def post_detail(self):
        self.client.get("cur_weather")

    @task
    def get_stop(self):
        self.client.get('stop/8230DB006290/')

    @task 
    def get_route(self):
        self.client.get('route/46A/')

    @task
    def get_stop_name(self):
        self.client.get('stopname/8240DB001873/8250DB000767/0/')


    @task
    def get_prediction(self):
        self.client.get('prediction/8240DB001873/8250DB000767/1659259638/39A')


    @task
    def create_user(self):
        self.client.post('userManagement/createUsers/')



class private_endpoints(TaskSet):
   


    login_token = ''
    wait_time = between(2, 7)

    @task 
    def get_user_data(self):
        print(self.user)

        headers = {
            "Authorization": f"Bearer {self.user.login_token}"
        }

        self.client.get('userManagement/userdata/1',headers=headers)

    @task
    def put_user_data(self):
        
        headers = {
            "Authorization": f"Bearer {self.user.login_token}"
        }


        data = {
            "id" : 1,
            "favourite_stop_1" : "0",
            "favourite_stop_1" : "8240DB001873",
            "favourite_stop_1" : "8250DB000767",

        }

        self.client.put('userManagement/userdata/1',data, headers=headers)

    @task
    def stop(self):
        self.interrupt()

class TestUser(HttpUser):
    wait_time = between(5, 10)
    tasks = [private_endpoints]
    login_token = ''
    def on_start(self):
        response = self.client.post("userManagement/token/", json={"username": "mike", "password": "password"})
        self.login_token = response.json()['access']
        print(response)





   
        



    # @task
    # def set_user_data(self):



