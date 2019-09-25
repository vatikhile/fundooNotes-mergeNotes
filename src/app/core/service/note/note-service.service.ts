import { Injectable } from '@angular/core';
import { HttpServiceService } from '../http/http-service.service'

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  constructor(private http: HttpServiceService) { }
  addNote(data) {
    return this.http.addNotes("notes/addNotes", data)

  }

  getNotes() {
    return this.http.getData("notes/getNotesList")

  }
  addLabel(data) {
    return this.http.postEdit("noteLabels", data)

  }
  showNoteLabel() {
    return this.http.showLabel("noteLabels/getNoteLabelList")
  }
  deleteLabels(id) {
    return this.http.delete('notelabels/' + id + '/deleteNoteLabel');
  }
  updateLabel(id, data) {
    return this.http.postEd('noteLabels/' + id + '/updateNoteLabel', data);
  }
  updateNote(data) {
    return this.http.postUpdate('notes/updateNotes', data)
  }
  postColor(data) {

    return this.http.postData('notes/changesColorNotes', data)
  }
  postArchive(data) {
    return this.http.postData('notes/archiveNotes', data)
  }
  getNoteArchive() {
    return this.http.getNoteArchive1('notes/getArchiveNotesList')
  }
  postData(data) {
    return this.http.postData('notes/addUpdateReminderNotes', data)
  }
  deleteReminder(data) {
    return this.http.delete2('notes/removeReminderNotes', data)
  }
  pin(data) {
    return this.http.pinUnpin('notes/pinUnpinNotes', data)
  }
  getShopingCartDetailService() {
    return this.http.getCarts('productcarts/myCart');
  }
}
