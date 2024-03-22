import { Pet } from "src/app/models/pet.model";


export class AddPet {
  static readonly type = '[Pet] Add';
  constructor(public pet: Pet) {}
}

export class UpdatePet {
  static readonly type = '[Pet] Update';
  constructor(public pet: Pet) {}
}

export class DeletePet {
  static readonly type = '[Pet] Delete';
  constructor(public id: number) {}
}