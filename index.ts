import express, { Request, Response, response } from 'express';
import bodyParser from 'body-parser';

const knex = require("knex")(require("./knexfile").development);

const app = express();
const port = 3000;

app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
    res.send('sport activities API');
});

app.listen(port, () => {
    console.log(`server run http:localhost:${port}`)
});

// Listar todas as atividades
app.get('/activity', async (req: Request, res: Response) => {    
    knex
        .select("*")
        .from("activities")
        .then((rows:any) => {
          res.status(200).json(rows);
        })
        .catch((err:any) => {
          res.status(500).send({
              message: err.message || "Error to find activities.",
          });
        });
});

// Obter dados de uma única atividade
app.get('/activity/:id', async (req: Request, res: Response) => {
    let id = req.params.id;

    knex
        .select("*")
        .from("activities")
        .where("id", id)
        .then((rows:any) => {
            res.status(200).json(rows);
        })
        .catch((err:any) => {
            res.status(500).send({
                message: err.message || "Error to find an activity.",
            });
        });
});

// Cadastrar uma nova atividade
app.post('/activity', async (req: Request, res: Response) => {
    if (req.body.id) delete req.body.id;

    let activity = req.body

    knex("activities")
        .insert(activity, ["id"])
        .then((activities:any) => {
            if(activities.length === 0) {
                res.status(400).send({
                    message: "Error to insert an activity"
                });
                return;
            }
            
            let id = activities[0].id;

            res.status(201).json({
                message: `inserted successfully`,
                data: { id },
            });
        })
        .catch((err:any) => {
            res.status(500).send({
                message: err.message || "Error to insert an activity.",
            });
        });
});
  

// Atualizar uma atividade
app.put('/activity/:id', async (req: Request, res: Response) => {
    let id = req.params.id;

    if (!id) res.status(400).send("Id not provided");

    knex("activities")
        .where("id", id)
        .update(req.body)
        .then((result:any) => {
            if (result === 0) {
                res.status(404).send({
                    message: "Activity not find",
                });
                return;
            }

            res.status(200).json({
                message: `Activity updated`,
                data: { id },
            });
        })
        .catch((err:any) => {
            res.status(500).send({
                message: err.message || "Error to update an activity.",
            });
        });
});

// Apaga uma atividade
app.delete('/activity/:id', async (req: Request, res: Response) => {
    let id = req.params.id;

    if (!id) res.status(400).send("Id not provided");

    knex("activities")
        .where("id", id)
        .del()
        .then((result:any) => {
            if (result == 0) {
                res.status(404).send({
                    message: "Activity not find",
                });
                return;
            }

            res.status(200).json({
                message: `Activity deleted`,
            });
        })
        .catch((err:any) => {
            res.status(500).json({
                message: err.message || "Error to delete an activity.",
            });
        });
});