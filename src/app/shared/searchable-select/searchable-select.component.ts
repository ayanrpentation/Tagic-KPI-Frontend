import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.css']
})
export class SearchableSelectComponent {
  @Input() items: any[] = [];
  @Input() labelKey: string = 'label'; // e.g., 'details_description'
  @Input() valueKey: string = 'value'; // e.g., 'id'
  @Input() placeholder: string = 'Select';
  @Input() height: string = '';

  @Output() selectionChange = new EventEmitter<any>();

  searchText: string = '';
  selectedLabel: string = '';
  selectedValue: any = '';
  showDropdown: boolean = false;

  constructor(private _eref: ElementRef) {}

  get filteredItems(): any[] {
    return this.items.filter(item =>
      String(item[this.labelKey]).toLowerCase().includes(this.searchText.toLowerCase())
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
    this.selectionChange.emit(this.selectedValue);
    this.showDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }
}
