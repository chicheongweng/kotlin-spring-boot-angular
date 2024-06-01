import { Component, OnInit } from '@angular/core';
import { PetService } from '../generated/api/pet.service';
import { Pet } from '../generated/model/pet';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.css'
})
export class PetComponent implements OnInit {
  pet: Pet | undefined;

  constructor(private apiService: PetService) { }

  ngOnInit() {
    this.getPet();
  }

  getPet(): void {
    this.apiService.getPetById(1).subscribe(pet => this.pet = pet);
  }

  addPet(newPet: Pet): void {
    this.apiService.addPet(newPet).subscribe(pet => {
      console.log('New pet added:', pet);
      // You might want to update the UI here
    });
  }

  updatePet(updatedPet: Pet): void {
    this.apiService.updatePet(updatedPet).subscribe(pet => {
      console.log('Pet updated:', pet);
      // You might want to update the UI here
    });
  }

  deletePet(id: number): void {
    this.apiService.deletePet(id).subscribe(() => {
      console.log('Pet deleted');
      // You might want to update the UI here
    });
  }
}
