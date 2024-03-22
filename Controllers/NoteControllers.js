import noteSchema from "../Schemas/NoteSchema.js";

export async function getAllNote(req, res) {
  const allNoteData = await noteSchema.find({ userId: req.idUser });
  res.status(200).json({
    data: allNoteData,
    message: "View all data",
    status: 200,
  });
}

export async function updateNote(req, res) {
  try {
    const { note, title } = req.body;
    const foundData = await noteSchema.findOneAndUpdate(
      { _id: req.params["id"], userId: req.idUser },
      { note: note, title: title },
      { new: true }
    );
    if (!foundData) throw new Error("not updated");
    res.status(200).json({
      data: foundData,
      message: "Successfully updated",
      status: 200,
    });
  } catch (e) {
    res.status(400).json({ data: null, message: e.message, status: 400 });
  }
}

export async function insertNote(req, res) {
  try {
    const noteX = new noteSchema({
      note: req.body.note,
      title: req.body.title,
      userId: req.idUser
    });
    await noteX.save();
    console.log(req.idUser)
    if (!noteX) throw new Error("Unable to insert note");
    res.status(200).json({
      data: noteX,
      message: "Successfully added",
      status: 200,
    });
  } catch (e) {
    console.log(e.message);
  }
}

export async function searchNotes(req, res) {
  try {
    const searchNote = await noteSchema.findOne({ userId: req.idUser, _id: req.params["id"] });
    if (!searchNote) throw new Error("data not found!");
    res.status(200).json({
      data: searchNote,
      message: "Successfully found",
      status: 200,
    });
  } catch (e) {
    res.status(404).json({
      data: null,
      message: e.message,
      status: 404,
    });
  }
}

export async function deletedNotes(req, res) {
  try {
    const deletedNote = await noteSchema.findOneAndDelete({ _id: req.params["id"], userId: req.idUser });
    if (!deletedNote) throw new Error("unable to delete note");
    res.status(200).json({
      data: deletedNote,
      message: "Successfully deleted",
      status: 200,
    });
  } catch (e) {
    res.status(404).json({
      data: null,
      message: e.message,
      status: 404,
    });
  }
}

export async function searchByName(req, res) {
  try {
    let titleToSearch = req.query.name;
    titleToSearch = titleToSearch.trim();
    if (titleToSearch === "") throw new Error(`Check your String`)
    const foundNote = await noteSchema.find({ title: titleToSearch, userId: req.idUser });
    if (foundNote.length === 0) throw new Error(`No data found with ${titleToSearch}`)
    res.status(200).json({
      data: foundNote,
      message: "Data found",
      status: 200,
    });
  } catch (err) {
    res.status(400).json({
      data: null,
      message: err.message,
      status: 400,
    });
  }
}

export async function showUpdatedData(req, res) {
  try {

    const data = await noteSchema.find({ userId: req.idUser });
    const sortedData = data.filter(ele => ele.createdAt < ele.updatedAt).sort((a, b) => b.updatedAt - a.updatedAt);
    if (sortedData.length === 0) throw new Error("No data to sort");
    res.status(200).json({
      data: sortedData.slice(0, 3),
      message: "Last 3 updated data",
      status: 200,
    });
  } catch (err) {
    res.status(400).json({
      data: null,
      message: err.message,
      status: 400,
    });
  }
}

export async function showSoftDeleteAll(req, res) {
  try {
    const arrayData = req.body.ids;
    const updateVisibility = await noteSchema.updateMany(
      {
        _id: { $in: arrayData },
        userId: req.idUser
      },
      { $set: { isSoftDelete: true } }
    );
    console.log(updateVisibility)
    res.status(200).json({
      data: updateVisibility,
      message: "Visibility Updated",
      status: 200
    })
  }catch(e){
    res.status(400).json({
      data: null,
      message: e.message,
      status: 404
    })
  }
}

export async function showSoftDeleteTrue(req,res){
  try{
    const trueData = await noteSchema.find({userId : req.idUser, isSoftDelete: true});
    if(trueData.length === 0) throw new Error("No data found")
    res.status(200).json({
      data:trueData,
      message : "Datas with visibility!",
      status:200
    })

  }catch(e){
    res.status(400).json({
      data:null,
      message : e.message,
      status:400
    })
  }
}

export async function deleteMultiple(req,res){
  try {
    const arrayData = req.body.ids;
    const deleteNotes = await noteSchema.deleteMany({ _id: { $in: arrayData },userId: req.idUser});
    res.status(200).json({
      data: deleteNotes,
      message: "Visibility Updated",
      status: 200
    })
  }catch(e){
    res.status(400).json({
      data: null,
      message: e.message,
      status: 404
    })
  }
}