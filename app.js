// This is node js application usinf express module
// To fetch the data from Stateful set of Postgres db
//
//
// This code is developed by Lovekush Kumar (3163193) 
// for NAGP Assignment of DevOps and Kubernetes Advance


//#region importing modules
const express = require('express');
const { Pool } = require('pg');
//#endregion

const app = express();

const pool = new Pool({

  // hostname of headless service that is deployed on Kubernestes cluster
  host: 'database-statefulset-0.database-headless-service.default.svc.cluster.local',
  // Postgres admin user name 
  user: 'dba',
  // Postgres admin password
  password: '12345',
  // Postgres database name
  database: 'database',
});

app.get('/', async (req, res) => {
  try {

    // Select query to get the data from Postgres database
    const query = 'SELECT * FROM mytable';
    // resule set
    const result = await pool.query(query);
    // 
    res.json(result.rows);

    // Catch in case of error while fetching data from POstgres SQL db 
  } catch (error) {
    console.error('Error fetching data from mytable:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3010, () => {
  console.log('Server is listening on port 3010');
});