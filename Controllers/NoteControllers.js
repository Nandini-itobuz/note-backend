import noteSchema from '../Schema.js'


async function getAllData(){
    try {
       return await noteSchema.find();
      } catch (e) {
        console.log(e.message);
      }
}

async function updateOldData(noteId, noteDetails){
    try {
        const {note,title} = noteDetails;
        const foundData = await noteSchema.findByIdAndUpdate({_id : noteId}, {note:note, title : title})
        return foundData;
       } catch (e) {
         console.log(e.message);
       }
}

async function insertNewData(newNote,newTitle){
    try {
        const noteX = await noteSchema.create({
          note: newNote,
          title: newTitle,
        });
      } catch (e) {
        console.log(e.message);
      }
}

async function searchData(noteId){
    try{
        return await noteSchema.findById(noteId);
    }catch(e){
        console.log(e.message)
    }
}




export async function getAllNote(req,res){
    const allNoteData = await getAllData();
    res.status(200).json({
        data : allNoteData,
        message: "View all data",
        status: 200
    })
}


export async function updateNote (req,res){
    const updatedData = await updateOldData(req.params['id'],req.body);
    res.status(200).json({
        data:updatedData,
        message: "Successfully updated",
        status: 200
    })
}

export async function insertNote (req,res){
    insertNewData(req.body.note,req.body.title);
    res.status(200).json({
        data:req.body,
        message: "Successfully added",
        status: 200
    })
}


export async function searchNotes (req,res){
    const searchNote = await searchData(req.params['id']);
    res.status(200).json({
        data: searchNote,
        message: "Successfully found",
        status: 200
    })
}


export async function deletedNotes (req,res){
    try{
        const deletedNote = await noteSchema.findByIdAndDelete(req.params['id']);
        if(!deletedNote){
            res.status(404).json({
                message: "Uanble to delete the note",
                status: 404
            })
        }
        res.status(200).json({
            message: "Successfully deleted",
            status: 200
        })
    }catch(e){
        console.log("Failed to delete the data!")
    }
    
}


