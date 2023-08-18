
export const Botton_action = {
  Ver: {
    nombre: 'VER',
    titulo: 'VER DETALLE',
    descripcion: "VER DETALLE"
  },
  Crear: {
    nombre: 'AÑADIR',
    titulo: 'AÑADIR',
    descripcion: "AÑADIR DATOS"
  },
  Editar: {
    nombre: 'EDITAR',
    titulo: 'EDITAR',
    descripcion: "EDITAR DATOS"
  },
  Eliminar: {
    nombre: 'ELIMINAR',
    titulo: 'ELIMINAR',
    descripcion: "ELIMINAR"
  },
  EliminarLista: {
    nombre: 'ELIMINAR',
    titulo: 'ELIMINAR',
    descripcion: "Eliminar toda la lista relacionada"
  },
  Cancelar: {
    nombre: 'CANCELAR',
    titulo: 'CANCELAR',
    descripcion: "CANCELAR"
  },
  Guardar: {
    nombre: 'GUARDAR',
    titulo: 'GUARDAR',
    descripcion: "GUARDAR"
  },
  Aceptar: {
    nombre: 'ACEPTAR',
    titulo: 'ACEPTAR',
    descripcion: "ACEPTAR"
  },
  SubirExcel: {
    nombre: 'SUBIR EXCEL',
    titulo: 'SUBIR EXCEL',
    descripcion: "SUBIR EXCEL"
  },
  CambiarContrasena: {
    nombre: 'Cambiar Contraseña',
    titulo: 'Cambiar Contraseña',
    descripcion: "Cambiar Contraseña"
  },
  Calcular: {
    nombre: 'CALCULAR',
    titulo: 'CALCULAR',
    descripcion: "CALCULAR"
  },
  Graficar: {
    nombre: 'GRAFICAR',
    titulo: 'GRAFICAR',
    descripcion: "GRAFICAR DATOS"
  },
  GraficarIndividual: {
    nombre: 'GRAFICO INDIVIDUAL',
    titulo: 'GRAFICO INDIVIDUAL',
    descripcion: "GRAFICO INDIVIDUAL"
  },
  Buscar: {
    nombre: 'BUSCAR',
    titulo: 'BUSCAR',
    descripcion: "BUSCAR"
  },
  CosumoDiario: {
    nombre: 'STOCK Y CONSUMO DIARIO QUÍMICOS',
    titulo: 'STOCK Y CONSUMO DIARIO QUÍMICOS',
    descripcion: "STOCK Y CONSUMO DIARIO QUÍMICOS"
  },
  VerReporte: {
    nombre: 'VER REPORTE',
    titulo: 'VER REPORTE',
    descripcion: "VER  REPORTE"
  },
  DescargarReporte: {
    nombre: 'DESCARGAR REPORTE',
    titulo: 'DESCARGAR REPORTE',
    descripcion: "DESCARGAR  REPORTE"
  },
  H2SPOZOS: {
    nombre: 'H2S POZOS',
    titulo: 'H2S POZOS',
    descripcion: "H2S POZOS"
  },
  Descargar: {
    nombre: 'DESCARGAR',
    titulo: 'DESCARGAR',
    descripcion: "DESCARGAR DATOS"
  },
  ReporteHistorico: {
    nombre: 'REPORTE HISTÓRICO',
    titulo: 'REPORTE HISTÓRICO',
    descripcion: "REPORTE HISTÓRICO"
  },
  ReporteCosto: {
    nombre: 'COSTO',
    titulo: 'COSTO',
    descripcion: "COSTO"
  },
  descargarPdf: {
    nombre: 'DESCARGAR PDF',
    titulo: 'DESCARGAR PDF',
    descripcion: "DESCARGAR PDF"
  }
}

export const modal_size = {
  SM: '400px',
  MD: '700px',
  LG: '1000px',
  XL: '1400px',
  XXL: '1920px'
}
export const modal_position = {
  top: "30px"
}


export const buscar_por_columna =
{
  buscar: "BUSCAR DATOS POR COLUMNA"
}
export const pagination_controls =
{
  siguiente: "Siguiente",
  anterior: "Anterior"
}
export const lista_ide =
{
  titulo: "LISTA DE"
}
export const titulos =
{
  detallePopop: "Detalle",
  eliminarPopop: "Eliminar",
  seleccionarPermisos: "Seleccionar permisos",
  seleccionarItems: "Seleccionar items",
  seleccionarMenus: "Seleccionar menus",
  eliminarPopopDetalleRol: "Eliminar Detalle",
  confirmarEliminacion: "Confirmar si desea eliminar el dato ?"
}

export const pageSizeOptions: number[] = [1, 5, 10, 25, 100, 500];

export const dateFormatPerzonalized = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const modules = {


  empresa: { name: "empresa", title: "Empresa", codigoUnico: "PTB27", path: "empresa" },
  menu: { name: "menu", title: "Menu", path: "menu" },
  fichaInscripcion: { name: "fichaInscripcion", title: "fichaInscripcion", codigoUnico: "fichaInscripcion", path: "fichaInscripcion" },
  reportesVotaciones: { name: "reportesVotaciones", title: "reportesVotaciones", codigoUnico: "reportesVotaciones", path: "reportesVotaciones" },
  carreras: { name: "carrera", title: "carrera", codigoUnico: "carrera", path: "carrera" },
  usuarioVotoEspecifico: { name: "usuarioVotoEspecifico", title: "usuarioVotoEspecifico", codigoUnico: "usuarioVotoEspecifico", path: "usuarioVotoEspecifico" },
  usuario: { name: "usuario", title: "Paciente", path: "usuario" },
  perfil: { name: "perfil", title: "Perfil", path: "perfil" },
  menuPerfil: { name: "menuPerfil", title: "Menú perfil", path: "menuPerfil" },
  nutriente: { name: "nutriente", title: "Nutriente", path: "nutriente" },
  comidas: { name: "comidas", title: "comidas", path: "comidas" },
  alimento: { name: "alimento", title: "alimento", path: "alimento" },
  evento: { name: "evento", title: "evento", path: "evento" },
  medico: { name: "medico", title: "Médico", path: "medico" },
  especialidade: { name: "especialidade", title: "Especialidades", path: "especialidade" },
  medicosEspecialidade: { name: "medicosEspecialidade", title: "Médicos Especialidades", path: "medicosEspecialidade" },
  catalogoSeguimiento: { name: "catalogoSeguimiento", title: "Catalogo de Seguimiento", path: "catalogoSeguimiento" },
  indiceSeguimiento: { name: "indiceSeguimiento", title: "Indice Seguimiento", path: "indiceSeguimiento" },
  cita: { name: "cita", title: "Cita Médica", path: "cita" },
  horario: { name: "horario", title: "Horarios", path: "horario" },
  seguimientoPaciente: { name: "seguimientoPaciente", title: "Seguimiento de Paciente", path: "seguimientoPaciente" },
}

export const actionResult = {
  GetList: { name: 'GetList' },
  GetAllCuentas: { name: 'GetAllCuentas' },
  GetAllFinanciero: { name: 'GetAllFinanciero' },
  GetAllPicking: { name: 'GetAllPicking' },
}

export const index = {
  items: undefined,
  item: undefined,
  allItems: undefined,
  count: 0,
  page: 1,
  quantity: 10,
  search: undefined,
  orderBy: undefined,
  orderType: undefined,
  parameters: undefined
}

export function ConvertirMesIntAString(mes: number): string {
  switch (mes) {
    case 1:
      {
        return 'Enero'
        break;
      }
    case 2:
      {
        return 'Febrero'
        break;
      }
    case 3:
      {
        return 'Marzo'
        break;
      }
    case 4:
      {
        return 'Abril'
        break;
      }
    case 5:
      {
        return 'Mayo'
        break;
      }
    case 6:
      {
        return 'Junio'
        break;
      }
    case 7:
      {
        return 'Julio'
        break;
      }
    case 8:
      {
        return 'Agosto'
        break;
      }
    case 9:
      {
        return 'Septiembre'
        break;
      }
    case 10:
      {
        return 'Octubre'
        break;
      }
    case 11:
      {
        return 'Noviembre'
        break;
      }
    case 12:
      {
        return 'Diciembre'
        break;
      }
    default:
      return 'No existe datos'
      break;
  }

}
export const variablesGlobales = {
  mes: "MES",
  dia: 'DIA'
}


export function ConvertirPrimerLetraMuyuscula(datos: string): string {

  return datos[0].toUpperCase() + datos.slice(1).toLowerCase();
}

export function ConvertirMuyuscula(datos: string): string {

  return datos.toUpperCase();
}


export function ConvertirBoolInt(dato: boolean): number {
  if (dato) {
    return 1;
  }
  else {
    return 0;
  }

}   
export function ConvertirIntBool(dato: number): number {
  if (dato) {
    return 1;
  }
  else {
    return 0;
  }
}