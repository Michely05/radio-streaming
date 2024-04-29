import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioComponent } from './radio.component';
import { By } from '@angular/platform-browser';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('it should show Radio Singular name', () => {
    it('should show Radio Singulars title', () => {
      expect(component.title).toBe('Radio Singulars');
    });
    it('should show the title: Radio Singulars', () => {
      const title = fixture.nativeElement.querySelector('h1');
      expect(title.textContent).toBe('Radio Singulars');
    });
  });

  describe('should search radio station by name', () => {
    it('should have an input with a placeholder: Escribe el nombre de la emisora', () => {
      const input = fixture.nativeElement.querySelector('input');
      const expectedPlaceholder = 'Escribe el nombre de la emisora';
      expect(input.placeholder).toBe(expectedPlaceholder);
    });
    it('should have a search button with the name "Search"', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button.textContent).toBe('Search');
    });
    it('should run the search function once', () => {
      const radioStationSpy = jest.spyOn(component, 'searchRadio');
      const button = fixture.debugElement.query(By.css('button'));
      button.triggerEventHandler('click', null);
      expect(radioStationSpy).toHaveBeenCalledTimes(1);
    });
    it('should exist a list of radio stations', () => {
      const radioStationList = fixture.nativeElement.querySelector('ul');
      expect(radioStationList).not.toBeNull();
    });
    it('radio station list should start empty', () => {
      const liElements = fixture.nativeElement.querySelectorAll('li');
      expect(liElements.length).toBe(0);
    });
    it('should show one result when search is successful', () => {
      component.filterArray = [
        {
          name: 'test',
          url: 'test',
          country: 'test',
        },
      ];
      const radioStationSpy = jest
        .spyOn(component, 'searchRadio')
        .mockImplementation(() => {
          component.filterArray = component.radioStations.filter((radio) => {
            return radio.name.includes('t');
          });
        });
      const liElements = fixture.nativeElement.querySelectorAll('li');
      // const input = fixture.debugElement.query(By.css('input'));
      const button = fixture.debugElement.query(By.css('button'));
      // input.triggerEventHandler('keyup', 'kiss fm');
      // component.inputValue = '8';
      button.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(liElements.length).toBeGreaterThan(0);
    });
  });
});
