// import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

// @Component({
//   selector: 'searchable-select',
//   templateUrl: './searchable-select.component.html',
//   styleUrls: ['./searchable-select.component.css']
// })
// export class SearchableSelectComponent {
//   @Input() items: any[] = [];
//   @Input() labelKey: string = 'label'; // e.g., 'details_description'
//   @Input() valueKey: string = 'value'; // e.g., 'id'
//   @Input() placeholder: string = 'Select';
//   @Input() height: string = '';

//   @Output() selectionChange = new EventEmitter<any>();

//   searchText: string = '';
//   selectedLabel: string = '';
//   selectedValue: any = '';
//   showDropdown: boolean = false;

//   constructor(private _eref: ElementRef) {}

//   get filteredItems(): any[] {
//     return this.items.filter(item =>
//       String(item[this.labelKey]).toLowerCase().includes(this.searchText.toLowerCase())
//     );
//   }

//   toggleDropdown(): void {
//     this.showDropdown = !this.showDropdown;
//     if (this.showDropdown) {
//       this.searchText = '';
//     }
//   }

//   selectItem(item: any): void {
//     this.selectedLabel = item[this.labelKey];
//     this.selectedValue = item[this.valueKey];
//     this.selectionChange.emit(this.selectedValue);
//     this.showDropdown = false;
//   }

//   @HostListener('document:click', ['$event'])
//   handleOutsideClick(event: MouseEvent) {
//     if (!this._eref.nativeElement.contains(event.target)) {
//       this.showDropdown = false;
//     }
//   }
// }























// import {
//   Component,
//   Input,
//   Output,
//   EventEmitter,
//   ElementRef,
//   HostListener,
//   forwardRef
// } from '@angular/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// @Component({
//   selector: 'searchable-select',
//   templateUrl: './searchable-select.component.html',
//   styleUrls: ['./searchable-select.component.css'],
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       useExisting: forwardRef(() => SearchableSelectComponent),
//       multi: true,
//     },
//   ],
// })
// export class SearchableSelectComponent implements ControlValueAccessor {
//   @Input() items: any[] = [];
//   @Input() labelKey: string = 'label';
//   @Input() valueKey: string = 'value';
//   @Input() placeholder: string = 'Select';
//   @Input() height: string = '';

//   @Output() selectionChange = new EventEmitter<any>();

//   searchText: string = '';
//   selectedLabel: string = '';
//   selectedValue: any = '';
//   showDropdown: boolean = false;

//   constructor(private _eref: ElementRef) {}

//   get filteredItems(): any[] {
//     return this.items.filter(item =>
//       String(item[this.labelKey])
//         .toLowerCase()
//         .includes(this.searchText.toLowerCase())
//     );
//   }

//   toggleDropdown(): void {
//     this.showDropdown = !this.showDropdown;
//     if (this.showDropdown) {
//       this.searchText = '';
//     }
//   }

//   selectItem(item: any): void {
//     this.selectedLabel = item[this.labelKey];
//     this.selectedValue = item[this.valueKey];

//     // 🔹 notify Angular forms
//     this.onChange(this.selectedValue);
//     this.onTouched();

//     // 🔹 emit for parent listeners
//     this.selectionChange.emit(this.selectedValue);

//     this.showDropdown = false;
//   }

//   @HostListener('document:click', ['$event'])
//   handleOutsideClick(event: MouseEvent) {
//     if (!this._eref.nativeElement.contains(event.target)) {
//       this.showDropdown = false;
//     }
//   }

//   // -------------------------
//   // ControlValueAccessor API
//   // -------------------------
//   onChange = (_: any) => {};
//   onTouched = () => {};

//   writeValue(value: any): void {
//     this.selectedValue = value;
//     if (value !== null && value !== undefined) {
//       const found = this.items.find(i => i[this.valueKey] === value);
//       this.selectedLabel = found ? found[this.labelKey] : '';
//     } else {
//       this.selectedLabel = '';
//     }
//   }

//   registerOnChange(fn: any): void {
//     this.onChange = fn;
//   }

//   registerOnTouched(fn: any): void {
//     this.onTouched = fn;
//   }
// }
















import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  forwardRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchableSelectComponent),
      multi: true,
    },
  ],
})
export class SearchableSelectComponent implements ControlValueAccessor, OnChanges {
  @Input() items: any[] = [];
  @Input() labelKey: string = 'label';   // e.g. 'details_description'
  @Input() valueKey: string = 'value';   // e.g. 'id'
  @Input() placeholder: string = 'Select';
  @Input() height: string = '';

  @Output() selectionChange = new EventEmitter<any>();

  searchText: string = '';
  selectedLabel: string = '';
  selectedValue: any = '';
  showDropdown: boolean = false;

  constructor(private _eref: ElementRef) {}

  // -------------------------
  // Filtering logic
  // -------------------------
  get filteredItems(): any[] {
    if (!this.items) return [];
    return this.items.filter(item =>
      String(item[this.labelKey])
        .toLowerCase()
        .includes(this.searchText.toLowerCase())
    );
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown) {
      this.searchText = '';
    }
  }

  selectItem(item: any): void {
    this.selectedLabel = item[this.labelKey];
    this.selectedValue = item[this.valueKey];

    // 🔹 notify Angular forms
    this.onChange(this.selectedValue);
    this.onTouched();

    // 🔹 emit for parent
    this.selectionChange.emit(this.selectedValue);

    this.showDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }

  // -------------------------
  // ControlValueAccessor API
  // -------------------------
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.selectedValue = value;

    if (!this.items || this.items.length === 0) {
      // items not yet loaded → just keep value
      this.selectedLabel = '';
      return;
    }

    if (value !== null && value !== undefined) {
      const found = this.items.find(i => i[this.valueKey] === value);
      this.selectedLabel = found ? found[this.labelKey] : '';
    } else {
      this.selectedLabel = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // -------------------------
  // Re-run label resolution when items arrive
  // -------------------------
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] && this.selectedValue) {
      const found = this.items?.find(i => i[this.valueKey] === this.selectedValue);
      this.selectedLabel = found ? found[this.labelKey] : '';
    }
  }
}


