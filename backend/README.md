To start the Django backend:


Create the virtual environment from the environment.yml file by running the command:

    conda env create -f environment.yml

    The environment will be name after the first line of the environment.yml file
    This name is DubBusVE

Activate the virtual environment with the command:

    conda activate DubBusVE

Start the Django server by running the command:

	python manage.py runserver

To link Django backend to the AWS RDS mySQL server outlined in the DataHandling section:

    Create a .env file in the root directory containing all the aws endpoint data needed to establish the connection. 

        The file should have the following contents

        DB_ADMIN=”{the username associated to your DB}”
        DB_PASSWORD="{your DB password}"
        DB_URL="{Your DB endpoint URL}"
        DB_PORT="{Your DB port number}"
        DB_NAME="{The name of the DB}"

    The variable names must be the same in order to be compatible with the Django settings.py configuration. 


To enable the GTFSR processing feature:

    Sign up to the national transport authority developer portal and request a GTFS-R API key. The can be achieved at this website https://developer.nationaltransport.ie/

    Add the GTFSR key to your .env file under the following name and format:

        GTFSRKEY="{Your GTFSR Key}"
