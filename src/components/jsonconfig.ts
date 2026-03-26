// 📦 Config JSON
export const accordionItems = [
  {
    value: "validateApi",
    title: "Validate API",
    content: {
      initialFormData: {
        token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0LzIiLCJpYXQiOjE3MTgwMjY4NTB9.-1enTeVcqnqeAopYHAPEajX85_Q60T2pQZeU7NWr3Tc3"
      },
      submitLabel: "Validar API",
      customFields: [
        {
          name: "token",
          label: "API Token",
          type: "textarea",
          rows: 5
        }
      ],
      buildParams: (data: any) => [data.token]
    }
  },
  {
    value: "goToElementID",
    title: "Go to Element by ID",
    content: {
      initialFormData: {
        layerName: "EDUCACIO_ZONES_SECUNDARIA",
        elementID: "354",
        showCard: false
      },
      submitLabel: "Ejecutar",
      buildParams: (data: any) => [
        data.layerName,
        data.elementID,
        data.showCard
      ]
    }
  },
  {
    value: "goToElementFilter",
    title: "Go to Element by Filter",
    content: {
      initialFormData: {
        layerName: "EDUCACIO_ZONES_SECUNDARIA",
        field: "NOM_ZONA",
        value: "Lleida (taronja)",
        showCard: false
      },
      submitLabel: "Ejecutar",
      buildParams: (data: any) => [
        data.layerName,
        data.field,
        data.value,
        data.showCard
      ]
    }
  },
  {
    value: "simpleFilter",
    title: "Simple Filter",
    content: {
      initialFormData: {
        layerName: "TEST_EDUCACIO_OFERTA_ESCOLAR",
        field: "",
        operator: "ILIKE 'value'",
        value: "",
        type: "cercle",
        geom: [[0.612820, 41.615240], 20000],
        epsg: "EPSG:4326",
        zoom: false,
        table: false
      },
      submitLabel: "Ejecutar",
      buildParams: (formData: any) => [
        {
          layerName: formData.layerName,
          field: formData.field,
          value: formData.value,
          operator: formData.operator,
          type: formData.type,
          geom: formData.geom,
          epsg: formData.epsg
        },
        formData.zoom,
        formData.table
      ]
    }
  },
  {
    value: "advancedFilter",
    title: "Advanced Filter",
    content: {
      initialFormData: {
        layerName: "XT_GRAF_CATALEG_CARRETERES",
        filter: {
          filter: [
            {
              field: "FUNCIONAL",
              operator: "ILIKE '%25value%25'",
              value: "Local"
            },
            {
              field: "COMARCA",
              operator: "ILIKE '%25value%25'",
              value: "Alt Camp"
            }
          ]
        },
        operator: "OR",
        type: "cercle",
        geom: [[0.61282, 41.61524], 20000],
        epsg: "EPSG:4326",
        zoom: false,
        table: false
      },
      submitLabel: "Ejecutar",
      buildParams: (formData: any) => [
        {
          layerName: formData.layerName,
          filter: formData.filter,
          operator: formData.operator,
          type: formData.type,
          geom: formData.geom,
          epsg: formData.epsg
        },
        formData.zoom,
        formData.table
      ]
    }
  },
  {
    value: "getTable",
    title: "Demnada la taula de dades d'una capa",
    content: {
      initialFormData: {
        layerName: "TEST_EDUCACIO_OFERTA_ESCOLAR",
        page: 1
      },
      submitLabel: "Demanar taula",
      buildParams: (data: any) => [data.layerName, data.page]
    }
  },
  {
    value: "search",
    title: "Realitza cerques",
    content: {
      initialFormData: {
        text: "TEST_EDUCACIO_OFERTA_ESCOLAR",
        tab: ""
      },
      submitLabel: "Cercar",
      buildParams: (data: any) => [data.text, data.tab]
    }
  },
  {
    value: "zoomToCoord",
    title: "Localitza coordenades",
    content: {
      initialFormData: {
        coords: [0.612820, 41.615240],
        epsg: "EPSG:4326",
        info: false
      },
      submitLabel: "Localitza coordenades",
      buildParams: (data: any) => [
        data.coords,
        data.epsg,
        data.info
      ]
    }
  },
  {
    value: "searchAddress",
    title: "Cerca adreça",
    content: {
      initialFormData: {
        text: "Carrer de la Marina, Barcelona",
        info: false
      },
      submitLabel: "Cercar adreça",
      buildParams: (data: any) => [data.text, data.info]
    }
  },
  {
    value: "geocode",
    title: "Geocode",
    content: {
      initialFormData: {
        search: "marinet 4 sabadell",
        size: 10,
        layers: "topo1,topo2,address,pk"
      },
      submitLabel: "Cercar adreça",
      buildParams: (formData: any) => [
        {
          search: formData.search,
          size: Number(formData.size),
          layers: formData.layers
        }
      ]
    }
  },
  {
    value: "zoomToBbox",
    title: "Zoom to BBox [minX, minY, maxX, maxY]",
    content: {
      initialFormData: {
        bbox: [0.5, 41.5, 0.7, 41.7],
        epsg: "EPSG:4326",
        info: false
      },
      submitLabel: "Zoom to BBox",
      buildParams: (data: any) => [data.bbox, data.epsg, data.info]
    }
  },
  {
    value: "loadLayer",
    title: "Load Layer",
    content: {
      initialFormData: {
        layerName: "RESIDUS_CONSTRUCCIO",
        styleName: "ResCon"
      },
      submitLabel: "Cargar capa",
      buildParams: (data: any) => [data.layerName, data.styleName]
    }
  },
  {
    value: "unloadLayer",
    title: "Unload Layer",
    content: {
      initialFormData: {
        layerName: "RESIDUS_CONSTRUCCIO"
      },
      submitLabel: "Descargar capa",
      buildParams: (data: any) => [data.layerName]
    }
  },
  {
    value: "changeLayerVisibility",
    title: "Change Layer Visibility",
    content: {
      initialFormData: {
        layerName: "RESIDUS_CONSTRUCCIO"
      },
      submitLabel: "Cambiar visibilidad",
      buildParams: (data: any) => [data.layerName]
    }
  },
  {
    value: "drawNewElement",
    title: "Draw New Element",
    content: {
      initialFormData: {
        layerName: "TEST_EDICIO_POLY",
        mode: false,
        geom: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [[[0.60, 41.61], [0.62, 41.61], [0.62, 41.62], [0.60, 41.62], [0.60, 41.61]]]
          },
          properties: {}
        },
        epsg: "EPSG:4326",
        params: {
          NOM_CENTRE: "Escola Example",
          CODI_MUNICIPI: "08019",
          TIPUS: "Escola bressol"
        }
      },
      submitLabel: "Ejecutar",
      buildParams: (data: any) => [
        data.layerName,
        data.mode,
        data.geom,
        data.epsg,
        data.params
      ]
    }
  },
  {
    value: "insertNewElement",
    title: "Insert New Element",
    content: {
      initialFormData: {
        layerName: "TEST_EDICIO_POLY",
        properties: {
          ZEPA: "Escola Example"
        },
        geom: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [[[0.60, 41.61], [0.62, 41.61], [0.62, 41.62], [0.60, 41.62], [0.60, 41.61]]]
          },
          properties: {}
        },
        epsg: "EPSG:4326",
        loadLayer: true
      },
      submitLabel: "Ejecutar",
      buildParams: (data: any) => [
        data.layerName,
        data.properties,
        data.geom,
        data.epsg,
        data.loadLayer
      ]
    }
  },
  {
    value: "drawEditElement",
    title: "Draw Edit Element",
    content: {
      initialFormData: {
        layerName: "TEST_EDICIO_POLY",
        featureId: "384",
        mode: false,
        geom: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [[[0.60, 41.61], [0.62, 41.61], [0.62, 41.62], [0.60, 41.62], [0.60, 41.61]]]
          },
          properties: {}
        },
        epsg: "EPSG:4326",
        properties: {
          ZEPA: "Escola Example"
        }
      },
      submitLabel: "Ejecutar",
      buildParams: (data: any) => [
        data.layerName,
        data.featureId,
        data.mode,
        data.geom,
        data.epsg,
        data.properties
      ]
    }
  },
  {
    value: "directEdition",
    title: "Direct Edition",
    content: {
      initialFormData: {
        layerName: "TEST_EDICIO_POLY",
        featureId: "384",
        properties: {
          ZEPA: "Escola direct updated"
        },
        geom: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [[[0.60, 41.61], [0.62, 41.61], [0.62, 41.62], [0.60, 41.62], [0.60, 41.61]]]
          },
          properties: {}
        },
        epsg: "EPSG:4326",
        loadLayer: true
      },
      submitLabel: "Direct Edition",
      buildParams: (data: any) => [
        data.layerName,
        data.featureId,
        data.properties,
        data.geom,
        data.epsg,
        data.loadLayer
      ]
    }
  },
  {
    value: "cancelEdition",
    title: "Cancel Edition",
    content: {
      submitLabel: "Stop Editing"
    }
  },
  {
    value: "drawCommit",
    title: "Commit Drawing",
    content: {
      initialFormData: {
        properties: {
          ZEPA: "Escola Updated"
        }
      },
      submitLabel: "Ejecutar",
      buildParams: (data: any) => [data.properties]
    }
  },
  {
    value: "deleteElement",
    title: "Delete Element",
    content: {
      initialFormData: {
        layerName: "TEST_EDICIO_POLY",
        elementID: "123",
        loadLayer: true
      },
      submitLabel: "Ejecutar",
      buildParams: (data: any) => [data.layerName, data.elementID, data.loadLayer]
    }
  },
  {
    value: "locateUser",
    title: "Locate User",
    content: {
      submitLabel: "Locate User"
    }
  },
  {
    value: "getUserLocation",
    title: "Get User Location",
    content: {
      submitLabel: "Get User Location"
    }
  },
  {
    value: "zoomToCoordNew",
    title: "Zoom to Coordinate",
    content: {
      initialFormData: {
        coords: [0.612820, 41.615240],
        epsg: "EPSG:4326",
        info: false
      },
      submitLabel: "Zoom to Coordinates",
      buildParams: (data: any) => [
        data.coords,
        data.epsg,
        data.info
      ]
    }
  },
  {
    value: "drawCircle",
    title: "Draw Circle",
    content: {
      initialFormData: {
        coords: [0.61282, 41.61524],
        radius: 20000,
        epsg: "EPSG:4326",
        drawStyle: {
          color: '#c00000',
          width: 2,
          opacity: 20,
          borderType: 'solid'
        }
      },
      submitLabel: "Ejecutar",
      buildParams: (data: any) => [data.coords, data.radius, data.epsg, data.drawStyle]
    }
  },
  {
    value: "getLegendInfo",
    title: "Get Legend Info",
    content: {
      submitLabel: "Get Legend Info"
    }
  },
  {
    value: "deleteLastDrawing",
    title: "Delete Last Drawing",
    content: {
      submitLabel: "Delete Last Drawing"
    }
  },
  {
    value: "deleteAllDrawings",
    title: "Delete All Drawings",
    content: {
      submitLabel: "Delete All Drawings"
    }
  },
  {
    value: "getFeaturesInfo",
    title: "Get Features info",
    content: {
      initialFormData: {
        layerNames: ["EDUCACIO_ZONES_SECUNDARIA", "EDUCACIO_AREESTERRITORIALS"],
        coords: [0.612820, 41.615240],
        epsg: "EPSG:4326"
      },
      submitLabel: "Ejecutar",
      buildParams: (data: any) => [
        {
          layerNames: data.layerNames,
          coords: data.coords,
          epsg: data.epsg
        }
      ]
    }
  },
  {
    value: "clearFilters",
    title: "Clear Filters",
    content: {
      initialFormData: {
        layerName: "RESIDUS_CONSTRUCCIO"
      },
      submitLabel: "Ejecutar",
      buildParams: (data: any) => [data.layerName]
    }
  },
  {
    value: "selectFeature",
    title: "Select Feature",
    content: {
      initialFormData: {
        layerName: "RESIDUS_CONSTRUCCIO",
        filter: {},
        operator: "OR",
        type: "cercle",
        geom: [[0.61282, 41.61524], 20000],
        epsg: "EPSG:4326",
        zoom: false,
        styleName: "ResCon"
      },
      submitLabel: "Ejecutar",
      buildParams: (formData: any) => [
        {
          layerName: formData.layerName,
          filter: formData.filter,
          operator: formData.operator,
          type: formData.type,
          geom: formData.geom,
          epsg: formData.epsg
        },
        formData.zoom,
        formData.styleName
      ]
    }
  },
  {
    value: "clearSelectedFeatures",
    title: "Clear Selected Features",
    content: {
      submitLabel: "Ejecutar"
    }
  },
  {
    value: "activateDraw",
    title: "Active Drawing",
    content: {
      initialFormData: {
        drawType: "punt",
        drawStyle: {
          color: '#c00000',
          width: 2,
          opacity: 20,
          borderType: 'solid'
        }
      },
      submitLabel: "Activate Draw Interaction",
      buildParams: (data: any) => [data.drawType, data.drawStyle]
    }
  },
  {
    value: "deleteGeometries",
    title: "Delete Geometries",
    content: {
      initialFormData: {
        layerName: "TEST_EDICIO_POLY",
        featureId: "123"
      },
      submitLabel: "Ejecutar",
      buildParams: (data: any) => [data.layerName, data.featureId]
    }
  }
]