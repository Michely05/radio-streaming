import { Component, OnInit } from '@angular/core';
import data from '../../data/radioData.json';
import { Radio } from './radio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
})
export class RadioComponent implements OnInit {
  title: string = 'Radio Singulars';
  placeholder = 'Escribe el nombre de la emisora';
  radioStations: Radio[] = [];
  inputValue!: string;
  filterArray!: Radio[];
  ngOnInit(): void {
    this.radioStations = data;
  }

  searchRadio() {
    this.filterArray = this.radioStations.filter((radio: Radio) =>
      radio.name.includes(this.inputValue)
    );
  }
}
