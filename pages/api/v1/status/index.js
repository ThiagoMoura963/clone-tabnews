function status(request, response) {
  return response.status(200).send({ chave: "valor" });
}

export default status;
