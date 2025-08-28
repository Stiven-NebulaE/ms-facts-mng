export default {
  navigation: {
    'settings': 'Configuraciones',
    'facts-mng-shark-attack-management': 'Ataques de tiburones',
  },
  shark_attacks: {
    shark_attacks: 'Ataques de tiburones',
    search: 'Búsqueda rápida por nombre',
    add_new_shark_attack: 'Agregar Nueva',
    add_new_shark_attack_short: 'Agregar',
    import: 'IMPORTAR',
    importing: 'IMPORTANDO...',
    import_success: '¡Importación completada exitosamente!',
    import_error: 'La importación falló. Por favor intente de nuevo.',
    rows_per_page: 'Filas por página:',
    of: 'de',
    remove: 'Eliminar',
    table_colums: {
      date: 'Fecha',
      country: 'País',
      type: 'Tipo',
      species: 'Especie'
    },
    remove_dialog_title: "¿Desea eliminar las sharkAttacks seleccionadas?",
    remove_dialog_description: "Esta acción no se puede deshacer",
    remove_dialog_no: "No",
    remove_dialog_yes: "Si",
    filters: {
      title: "Filtros",
      active: "Activo",
      country: "País",
      type: "Tipo",
      species: "Especie"
    }
  },
  shark_attack: {
    shark_attacks: 'Ataque de tiburón',
    shark_attack_detail: 'Detalle de ataque de tiburón',
    save: 'GUARDAR',
    basic_info: 'Información Básica',
    date: 'Fecha',
    year: 'Año',
    type: 'Tipo',
    country: 'País',
    area: 'Área',
    location: 'Ubicación',
    activity: 'Actividad',
    name: 'Nombre',
    sex: 'Sexo',
    age: 'Edad',
    injury: 'Lesión',
    fatal_y_n: 'Fatal (S/N)',
    time: 'Hora',
    species: 'Especie',
    investigator_or_source: 'Investigador o Fuente',
    pdf: 'PDF',
    href_formula: 'Fórmula del Enlace',
    href: 'Enlace',
    case_number: 'Número de Caso',
    case_number0: 'Número de Caso 0',
    active: 'Activo',
    metadata_tab: 'Metadatos',
    metadata: {
      createdBy: 'Creado por',
      createdAt: 'Creado el',
      updatedBy: 'Modificado por',
      updatedAt: 'Modificado el',
    },
    not_found: 'Lo sentimos pero no pudimos encontrar la entidad que busca',
    internal_server_error: 'Error Interno del Servidor',
    update_success: 'SharkAttack ha sido actualizado',
    create_success: 'SharkAttack ha sido creado',
    query_related_cases: 'Consultar más casos en {country}',
    related_cases_title: 'Casos Relacionados en {country}',
    form_validations: {
      name: {
        length: "El nombre debe tener al menos {len} caracteres",
        required: "El nombre es requerido",
      },
      date: {
        required: "La fecha es requerida",
      },
      year: {
        required: "El año es requerido",
        min: "El año debe ser al menos {min}",
        max: "El año no puede ser mayor a {max}",
      },
      type: {
        required: "El tipo es requerido",
      },
      country: {
        required: "El país es requerido",
      },
      age: {
        required: "La edad es requerida",
      }
    },
  }
};