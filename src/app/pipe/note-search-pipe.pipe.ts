import { Pipe, PipeTransform } from '@angular/core';
import { Notes } from '../core/model/Notes/notes'

@Pipe({
  name: 'noteSearchPipe'
})
export class NoteSearchPipePipe implements PipeTransform {

  transform(allNote: Notes[], searchTerm: string): any {
    if (!allNote || !searchTerm) {
      return allNote;
    }
    return allNote.filter(data =>
      data.title.toLowerCase().indexOf(searchTerm) !== -1
      || data.description.toLowerCase().indexOf(searchTerm) !== -1)
  }
}






