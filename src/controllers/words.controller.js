import createHttpError from "http-errors";
import Word from "./../models/word.model.js";


export async function create(req, res){
  const { word } = req.body;
  const checkWord = await Word.find({$or: [{searchForm: {$in: [`${word}`]}}, {romaji: {$in: [`${word}`]}}]});
}

// export async function list(req, res){

// }

// export async function detail(req, res){

// }

// export async function update(req, res){

// }

// export async function destroy(req, res){

// }
