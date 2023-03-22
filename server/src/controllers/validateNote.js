function validateNote(req, res, next) {
  try {
    const { title, tag, content } = req.body;
    if (title && tag && content) {
      next();
    } else {
      throw new Error("Missing required fields");
    }
  } catch (e) {
    console.log("ERROR IN VALIDATING ADD NOTE", e.message);
    res.status(400).send({ ok: false, message: e.message });
  }
}

module.exports = validateNote;
