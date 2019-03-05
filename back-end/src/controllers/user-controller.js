function list(req, res, next) {
  let users = [{id: 1, name: "user1"}, {id: 2, name: "user2"}];
  return res.status(200)
    .set('Content-Type', 'application/json')
    .json(users);
}

export default {list};