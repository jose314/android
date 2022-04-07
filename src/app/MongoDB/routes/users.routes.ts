import express, {Request, Response} from"express";
import { ObjectId } from "mongodb";
import {collections} from "../services/database.service";
import Usuarios from "../model/model";

//CONFIG
export const usuariosRouter = express.Router();
usuariosRouter.use(express.json());

//GET
usuariosRouter.get("/", async (req: Request, res: Response) => {
  try{
      const vendedor = (await collections.vendedores.find({}).toArray()) as [];
      res.status(200).send(vendedor);
  }catch(error){
      res.status(500).send(error.message);
  }
});

//POST
usuariosRouter.post("/",async (req: Request, res: Response) =>{
    try{
        const newUsuario = req.body as Usuarios;
        const result = await collections.vendedores.insertOne(newUsuario);

        result
        ? res.status(201).send(`Successfully created ID: ${result.insertedId}`)
        : res.status(500).send("Failed to create");
        }catch(error){
            console.error(error);
            res.status(400).send(error.message);
        }
});

//PUT
usuariosRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedUsuarios: Usuarios = req.body as Usuarios;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.vendedores.updateOne(query, { $set: updatedUsuarios });

        result
            ? res.status(200).send(`Successfully updated with id ${id}`)
            : res.status(304).send(`User with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

//DELETE
usuariosRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.vendedores.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`USer with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
})

