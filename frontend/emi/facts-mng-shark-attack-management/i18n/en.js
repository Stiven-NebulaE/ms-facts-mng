export default {
  navigation: {
    'settings': 'Settings',
    'facts-mng-shark-attack-management': 'Shark Attacks',
  },
  shark_attacks: {
    shark_attacks: 'Shark Attacks',
    search: 'Quick search by name',
    add_new_shark_attack: 'ADD NEW',
    add_new_shark_attack_short: 'NEW',
    import: 'IMPORT',
    importing: 'IMPORTING...',
    import_success: 'Import completed successfully!',
    import_error: 'Import failed. Please try again.',
    rows_per_page: 'Rows per page:',
    of: 'of',
    remove: 'Remove',
    table_colums: {
      date: 'Date',
      country: 'Country',
      type: 'Type',
      species: 'Species'
    },
    remove_dialog_title: "Do you want to delete the selected Shark Attacks?",
    remove_dialog_description: "This action can not be undone",
    remove_dialog_no: "No",
    remove_dialog_yes: "Yes",
    filters: {
      title: "Filters",
      active: "Active",
      country: "Country",
      type: "Type",
      species: "Species"
    }
  },
  shark_attack: {
    shark_attacks: 'Shark Attack',
    shark_attack_detail: 'SharkAttack detail',
    save: 'SAVE',
    basic_info: 'Basic Info',
    date: 'Date',
    year: 'Year',
    type: 'Type',
    country: 'Country',
    area: 'Area',
    location: 'Location',
    activity: 'Activity',
    name: 'Name',
    sex: 'Sex',
    age: 'Age',
    injury: 'Injury',
    fatal_y_n: 'Fatal (Y/N)',
    time: 'Time',
    species: 'Species',
    investigator_or_source: 'Investigator or Source',
    pdf: 'PDF',
    href_formula: 'Href Formula',
    href: 'Href',
    case_number: 'Case Number',
    case_number0: 'Case Number 0',
    active: 'Active',
    metadata_tab: 'Metadata',
    metadata: {
      createdBy: 'Created by',
      createdAt: 'Created at',
      updatedBy: 'Modified by',
      updatedAt: 'Modified at',
    },
    modal_details: {
      title: 'Related Cases in {country}',
      close: 'Close',
      unknown: 'Unknown',
      yes: 'Yes',
    },
    not_found: 'Sorry but we could not find the entity you are looking for',
    internal_server_error: 'Internal Server Error',
    update_success: 'SharkAttack has been updated',
    create_success: 'SharkAttack has been created',
    query_related_cases: 'Query more cases in {country}',
    form_validations: {
      name: {
        length: "Name must be at least {len} characters",
        required: "Name is required",
      },
      date: {
        required: "Date is required",
      },
      year: {
        required: "Year is required",
        min: "Year must be at least {min}",
        max: "Year cannot be greater than {max}",
      },
      type: {
        required: "Type is required",
      },
      country: {
        required: "Country is required",
      },
      age: {
        required: "Age is required",
      }
    },
  }
};