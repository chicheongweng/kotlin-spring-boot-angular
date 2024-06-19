import { Component, OnInit } from '@angular/core';
import { PetService } from '../generated/api/pet.service';
import { Pet } from '../generated/model/pet';
import { Tag } from '../generated';
import { Category } from '../generated';
import { v4 } from 'uuid';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.css'
})
export class PetComponent implements OnInit {
  pet: Pet | undefined;
  CATEGORIES: Category[] = Array.from({length: 10}, (_, i) => ({ id: i + 1, name: `Category ${i + 1}` }));

  constructor(private apiService: PetService) { }

  ngOnInit() {
    for (var i = 0; i<10; i++)
      this.addPet(this.generateRandomPet());
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

  generateRandomCategory(): Category {
    const randomIndex = Math.floor(Math.random() * this.CATEGORIES.length);
    return this.CATEGORIES[randomIndex];
  }

  generateRandomTag(): Tag {
    return {
      //id: Math.floor(Math.random() * 10), // Generate a random id
      name: `Tag-${Math.floor(Math.random() * 10)}`, // Generate a random name
    };
  }

  public generateRandomPet(): Pet {
    return {
      //id: Math.floor(Math.random() * 1000), // Generate a random id
      name: `Pet-${Math.floor(Math.random() * 1000)}`, // Generate a random name
      //generate a random UUID
      uuid: v4(),
      category: this.generateRandomCategory(),
      photoUrls: Array.from({length: 3}, () => `https://example.com/photo-${Math.floor(Math.random() * 1000)}.jpg`),
      tags: Array.from({length: 5}, () => this.generateRandomTag()), // Generate an array of 5 random tags
      status: ['available', 'pending', 'sold'][Math.floor(Math.random() * 3)] as Pet.StatusEnum, // Randomly select a status and cast it to StatusEnum
    };
  }

}
