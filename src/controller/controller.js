// import res, { redirect } from "express/lib/response"; // Don't remember what this is for but it used to work
// import { connection } from "../database/connection.js"; //importing the const connection from the connection.js file to use in query
import { filmes } from "../model/filmes.js"; //importing the const filmes from the filmes.js file

export const getIndex = async (req, res) => {
  try {
    // const listFilmes = await connection.query("SELECT * FROM filmes", {
    //   model: filmes,
    // });
    const listFilmes = await filmes.findAll(); //Same as above except that it is a function from sequelize
    console.log(listFilmes);
    res.render("index.ejs", { listFilmes });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

export const getDetalhes = async (req, res) => {
  try {
    // const filmesDetalhes = await connection.query(`SELECT * FROM filmes WHERE id = ${req.params.id}`)
    const filmesDetalhes = await filmes.findByPk(req.params.id);
    res.render("detalhes.ejs", {
      filmesDetalhes,
    });
  } catch (err) {
    res.send(error.message);
  }
};

export const getDeletar = async (req, res) => {
  try {
    //await connection.query(`DELETE FROM filmes WHERE id = ${req.params.id}`);
    await filmes.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/");
  } catch (err) {
    res.send(error.message);
  }
};

export const getCriar = async (req, res) => {
  try {
    res.render("criar.ejs");
  } catch (err) {
    res.send(error.message);
  }
};

export const postCriar = async (req, res) => {
  const { nome, diretor, img, duracao, ano, iframe } = req.body;
  try {
    // await connection.query(
    //   `INSERT INTO filmes (nome, diretor, img, duracao, ano, iframe) VALUES:
    //     ('${nome}', '${diretor}', '${img}', ${duracao},'${ano}', '${iframe}')
    //   `)
    if (!nome || !diretor || !img || !duracao || !ano || !iframe) {
      res.send("Usuário, não tente me burlar! Preenchimento é obrigatório!");
    } else {
      await filmes.create({ nome, diretor, img, duracao, ano, iframe });
      console.log(req.body);
      res.redirect("/");
    }
  } catch (err) {
    res.send(error.message);
  }
};

export const getEditar = async (req, res) => {
  try {
    const filmeAtual = await filmes.findByPk(req.params.id);
    res.render("editar.ejs", {
      filmeAtual,
    });
  } catch (error) {
    res.send(error.message);
  }
};

export const postEditar = async (req, res) => {
  console.log(req.body);
  try {
    const { nome, diretor, img, duracao, ano, iframe } = req.body;
    await filmes.update(
      {
        nome: nome,
        diretor: diretor,
        img: img,
        duracao: duracao,
        ano: ano,
        iframe: iframe,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.redirect("/");
  } catch (error) {
    res.send(error.message);
  }
};
