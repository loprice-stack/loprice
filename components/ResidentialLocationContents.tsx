
import React from 'react'
import { Check, ChevronDown, ChevronUp, Search } from '@tamagui/lucide-icons-2'
import type { FontSizeTokens, SelectProps } from 'tamagui'
import { Adapt, Label, ListItem, Select, Sheet, Theme, XStack, YGroup, YStack, getFontSize, useWindowDimensions } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'
import Contents800_2_flexdirection_no_bckgnd from './Contents800_2_flexdirection_no_bckgnd'
import { GLOBAL_COUNTRIES, TANZANIA_REGIONS } from 'client/constants'
import arusha from 'assets/location/arusha.json';
import dar_es_salaam from 'assets/location/dar_es_salaam.json';
import dodoma from 'assets/location/dodoma.json';
import geita from 'assets/location/geita.json';
import iringa from 'assets/location/iringa.json';
import kagera from 'assets/location/kagera.json';
import katavi from 'assets/location/katavi.json';
import kigoma from 'assets/location/kigoma.json';
import kilimanjaro from 'assets/location/kilimanjaro.json';
import lindi from 'assets/location/lindi.json';
import manyara from 'assets/location/manyara.json';
import mara from 'assets/location/mara.json';
import mbeya from 'assets/location/mbeya.json';
import morogoro from 'assets/location/morogoro.json';
import mtwara from 'assets/location/mtwara.json';
import mwanza from 'assets/location/mwanza.json';
import njombe from 'assets/location/njombe.json';
import pwani from 'assets/location/pwani.json';
import rukwa from 'assets/location/rukwa.json';
import ruvuma from 'assets/location/ruvuma.json';
import shinyanga from 'assets/location/shinyanga.json';
import simiyu from 'assets/location/simiyu.json';
import singida from 'assets/location/singida.json';
import songwe from 'assets/location/songwe.json';
import tabora from 'assets/location/tabora.json';
import tanga from 'assets/location/tanga.json';



export function ResidentialLocationContents() {


  const { width, height } = useWindowDimensions();

  //location list
  const [countrylist, setCountryList] = React.useState(GLOBAL_COUNTRIES);
  const [regionlist, setRegionList] = React.useState(TANZANIA_REGIONS);
  const [districtlist, setDistrictList] = React.useState(TANZANIA_REGIONS);
  const [wardlist, setWardList] = React.useState(TANZANIA_REGIONS);
  const [streetlist, setStreetList] = React.useState(TANZANIA_REGIONS);
  const [placeslist, setPlacesList] = React.useState(TANZANIA_REGIONS);

  //location
  const [country, setCountry] = React.useState<string>('Tanzania');
  const [region, setRegion] = React.useState<string>();
  const [district, setDistrict] = React.useState<string>();
  const [ward, setWard] = React.useState<string>();
  const [street, setStreet] = React.useState<string>();
  const [places, setPlaces] = React.useState<string>();

  const getDistrict = (region: any) => {
    if (region.includes('ARUSHA')) {
      const list: any = []
      let previousindex: any = "";
      arusha.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('DAR-ES-SALAAM')) {
      const list: any = []
      let previousindex: any = "";
      dar_es_salaam.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('DODOMA')) {
      const list: any = []
      let previousindex: any = "";
      dodoma.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('GEITA')) {
      const list: any = []
      let previousindex: any = "";
      geita.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('IRINGA')) {
      const list: any = []
      let previousindex: any = "";
      iringa.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('KAGERA')) {
      const list: any = []
      let previousindex: any = "";
      kagera.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('KATAVI')) {
      const list: any = []
      let previousindex: any = "";
      katavi.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('KIGOMA')) {
      const list: any = []
      let previousindex: any = "";
      kigoma.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('KILIMANJARO')) {
      const list: any = []
      let previousindex: any = "";
      kilimanjaro.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('LINDI')) {
      const list: any = []
      let previousindex: any = "";
      lindi.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('MANYARA')) {
      const list: any = []
      let previousindex: any = "";
      manyara.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('MARA')) {
      const list: any = []
      let previousindex: any = "";
      mara.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('MBEYA')) {
      const list: any = []
      let previousindex: any = "";
      mbeya.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('MOROGORO')) {
      const list: any = []
      let previousindex: any = "";
      morogoro.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('MTWARA')) {
      const list: any = []
      let previousindex: any = "";
      mtwara.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('MWANZA')) {
      const list: any = []
      let previousindex: any = "";
      mwanza.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('NJOMBE')) {
      const list: any = []
      let previousindex: any = "";
      njombe.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('PWANI')) {
      const list: any = []
      let previousindex: any = "";
      pwani.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('RUKWA')) {
      const list: any = []
      let previousindex: any = "";
      rukwa.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('RUVUMA')) {
      const list: any = []
      let previousindex: any = "";
      ruvuma.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('SHINYANGA')) {
      const list: any = []
      let previousindex: any = "";
      shinyanga.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('SIMIYU')) {
      const list: any = []
      let previousindex: any = "";
      simiyu.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('SINGIDA')) {
      const list: any = []
      let previousindex: any = "";
      singida.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('SONGWE')) {
      const list: any = []
      let previousindex: any = "";
      songwe.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('TABORA')) {
      const list: any = []
      let previousindex: any = "";
      tabora.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    } else if (region.includes('TANGA')) {
      const list: any = []
      let previousindex: any = "";
      tanga.map((a) => {
        if (previousindex !== a.DISTRIC) {
          previousindex = a.DISTRIC
          list.push({
            label: a.DISTRIC,
            value: a.DISTRIC,
          })
        }
      })
      setDistrictList(list)
    }
  }

  const getWard = (region: any, district: any) => {
    if (region.includes('ARUSHA')) {
      const list: any = []
      let previousindex: any = "";
      arusha.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('DAR-ES-SALAAM')) {
      const list: any = []
      let previousindex: any = "";
      dar_es_salaam.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('DODOMA')) {
      const list: any = []
      let previousindex: any = "";
      dodoma.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('GEITA')) {
      const list: any = []
      let previousindex: any = "";
      geita.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }
      })
      setWardList(list)
    } else if (region.includes('IRINGA')) {
      const list: any = []
      let previousindex: any = "";
      iringa.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('KAGERA')) {
      const list: any = []
      let previousindex: any = "";
      kagera.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('KATAVI')) {
      const list: any = []
      let previousindex: any = "";
      katavi.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('KIGOMA')) {
      const list: any = []
      let previousindex: any = "";
      kigoma.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('KILIMANJARO')) {
      const list: any = []
      let previousindex: any = "";
      kilimanjaro.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('LINDI')) {
      const list: any = []
      let previousindex: any = "";
      lindi.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('MANYARA')) {
      const list: any = []
      let previousindex: any = "";
      manyara.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('MARA')) {
      const list: any = []
      let previousindex: any = "";
      mara.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('MBEYA')) {
      const list: any = []
      let previousindex: any = "";
      mbeya.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('MOROGORO')) {
      const list: any = []
      let previousindex: any = "";
      morogoro.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('MTWARA')) {
      const list: any = []
      let previousindex: any = "";
      mtwara.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('MWANZA')) {
      const list: any = []
      let previousindex: any = "";
      mwanza.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('NJOMBE')) {
      const list: any = []
      let previousindex: any = "";
      njombe.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('PWANI')) {
      const list: any = []
      let previousindex: any = "";
      pwani.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('RUKWA')) {
      const list: any = []
      let previousindex: any = "";
      rukwa.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('RUVUMA')) {
      const list: any = []
      let previousindex: any = "";
      ruvuma.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('SHINYANGA')) {
      const list: any = []
      let previousindex: any = "";
      shinyanga.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('SIMIYU')) {
      const list: any = []
      let previousindex: any = "";
      simiyu.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('SINGIDA')) {
      const list: any = []
      let previousindex: any = "";
      singida.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('SONGWE')) {
      const list: any = []
      let previousindex: any = "";
      songwe.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('TABORA')) {
      const list: any = []
      let previousindex: any = "";
      tabora.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    } else if (region.includes('TANGA')) {
      const list: any = []
      let previousindex: any = "";
      tanga.map((a) => {
        if (district == a.DISTRIC) {
          if (previousindex !== a.WARD) {
            previousindex = a.WARD
            list.push({
              label: a.WARD,
              value: a.WARD,
            })
          }
        }

      })
      setWardList(list)
    }
  }

  //We changed from street to places because the data representing street are not the actual streets
  //rather than places on the respective wards. This value will be carried by count variable on the residential model
  const getPlaces = (region: any, district: any, ward: any) => {
    if (region.includes('ARUSHA')) {
      const list: any = []
      let previousindex: any = "";
      arusha.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('DAR-ES-SALAAM')) {
      const list: any = []
      let previousindex: any = "";
      dar_es_salaam.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('DODOMA')) {
      const list: any = []
      let previousindex: any = "";
      dodoma.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('GEITA')) {
      const list: any = []
      let previousindex: any = "";
      geita.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('IRINGA')) {
      const list: any = []
      let previousindex: any = "";
      iringa.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('KAGERA')) {
      const list: any = []
      let previousindex: any = "";
      kagera.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('KATAVI')) {
      const list: any = []
      let previousindex: any = "";
      katavi.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('KIGOMA')) {
      const list: any = []
      let previousindex: any = "";
      kigoma.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('KILIMANJARO')) {
      const list: any = []
      let previousindex: any = "";
      kilimanjaro.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('LINDI')) {
      const list: any = []
      let previousindex: any = "";
      lindi.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('MANYARA')) {
      const list: any = []
      let previousindex: any = "";
      manyara.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('MARA')) {
      const list: any = []
      let previousindex: any = "";
      mara.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('MBEYA')) {
      const list: any = []
      let previousindex: any = "";
      mbeya.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('MOROGORO')) {
      const list: any = []
      let previousindex: any = "";
      morogoro.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('MTWARA')) {
      const list: any = []
      let previousindex: any = "";
      mtwara.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('MWANZA')) {
      const list: any = []
      let previousindex: any = "";
      mwanza.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('NJOMBE')) {
      const list: any = []
      let previousindex: any = "";
      njombe.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('PWANI')) {
      const list: any = []
      let previousindex: any = "";
      pwani.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('RUKWA')) {
      const list: any = []
      let previousindex: any = "";
      rukwa.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('RUVUMA')) {
      const list: any = []
      let previousindex: any = "";
      ruvuma.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('SHINYANGA')) {
      const list: any = []
      let previousindex: any = "";
      shinyanga.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('SIMIYU')) {
      const list: any = []
      let previousindex: any = "";
      simiyu.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('SINGIDA')) {
      const list: any = []
      let previousindex: any = "";
      singida.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('SONGWE')) {
      const list: any = []
      let previousindex: any = "";
      songwe.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('TABORA')) {
      const list: any = []
      let previousindex: any = "";
      tabora.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    } else if (region.includes('TANGA')) {
      const list: any = []
      let previousindex: any = "";
      tanga.map((a) => {
        if (district == a.DISTRIC) {
          if (ward == a.WARD) {
            if (previousindex !== a.STREET) {
              previousindex = a.STREET
              list.push({
                label: a.STREET,
                value: a.STREET,
              })
            }
          }
        }

      })
      setPlacesList(list)
    }
  }

  return (

    <YGroup
      self="center"
      borderColor="$borderColor"
      rounded="$4"
      overflow="hidden"
      width={width < 600 ? width : 800}
      size="$4"
    >
      <YGroup.Item>
        <ListItem
          gap="$3"
          icon={Search}
          title="Location"
          subTitle={<ListItem.Subtitle>Choose residential location</ListItem.Subtitle>}
        />
      </YGroup.Item>
      <YGroup.Item>
        <ListItem gap="$3">
          <XStack width={width < 600 ? width : 600} items="center" gap="$2">
            <Contents800_2_flexdirection_no_bckgnd>
              <Select
                value={region}
                onValueChange={(text) => { setRegion(text); getDistrict(text) }}
              // renderValue enables SSR support by providing the label synchronously
              >
                <Select.Trigger
                  maxWidth={190}
                  iconAfter={ChevronDown}
                  borderRadius="$4"
                  backgroundColor="$background"
                >
                  <Select.Value placeholder="Regions" />
                </Select.Trigger>

                <Adapt
                  //@ts-ignore
                  when="maxMd"
                  platform="touch">

                  <Sheet
                    native={true}
                    modal
                    dismissOnSnapToBottom
                    //@ts-ignore
                    transition="medium">
                    <Sheet.Frame>
                      <Sheet.ScrollView>
                        <Adapt.Contents />
                      </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay
                      bg="$shadowColor"
                      //@ts-ignore
                      transition="lazy"
                      enterStyle={{ opacity: 0 }}
                      exitStyle={{ opacity: 0 }}
                    />
                  </Sheet>
                </Adapt>

                <Select.Content>
                  <Select.ScrollUpButton
                    items="center"
                    justify="center"
                    position="relative"
                    width="100%"
                    height="$3"
                  >
                    <YStack z={10}>
                      <ChevronUp size={20} />
                    </YStack>
                    <LinearGradient
                      start={[0, 0]}
                      end={[0, 1]}
                      fullscreen
                      colors={['$background', 'transparent']}
                      rounded="$4"
                    />
                  </Select.ScrollUpButton>
                  <Select.Viewport
                    minW={200}
                    bg="$background"
                    rounded="$4"
                    borderWidth={1}
                    borderColor="$borderColor"
                  >
                    <Select.Group>
                      <Select.Label fontWeight="700">Regions</Select.Label>
                      {/* for longer lists memorizing these is useful */}
                      {React.useMemo(
                        () =>
                          regionlist.map((item, i) => {
                            return (
                              <Select.Item
                                index={i}
                                key={item.value}
                                value={item.value}
                              >
                                <Select.ItemText>{item.value}</Select.ItemText>
                                <Select.ItemIndicator marginLeft="auto">
                                  <Check size={16} />
                                </Select.ItemIndicator>
                              </Select.Item>
                            )
                          }),
                        [regionlist]
                      )}
                    </Select.Group>
                    {/* Native gets an extra icon */}
                    <YStack
                      position="absolute"
                      r={0}
                      t={16}
                      items="center"
                      justify="center"
                      width={'$4'}
                      pointerEvents="none"
                    >
                      <ChevronDown
                        size={'$11'}
                      />
                    </YStack>
                  </Select.Viewport>
                  <Select.ScrollDownButton
                    items="center"
                    justify="center"
                    position="relative"
                    width="100%"
                    height="$3"
                  >
                    <YStack z={10}>
                      <ChevronDown size={20} />
                    </YStack>
                    <LinearGradient
                      start={[0, 0]}
                      end={[0, 1]}
                      fullscreen
                      colors={['transparent', '$background']}
                      rounded="$4"
                    />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select>

              <Select
                value={district}
                onValueChange={(text) => { setDistrict(text); getWard(region, text) }}
              >
                <Select.Trigger
                  maxWidth={190}
                  iconAfter={ChevronDown}
                  borderRadius="$4"
                  backgroundColor="$background"
                >
                  <Select.Value placeholder="Districts" />
                </Select.Trigger>

                <Adapt
                  //@ts-ignore
                  when="maxMd"
                  platform="touch">

                  <Sheet
                    native={true}
                    modal
                    dismissOnSnapToBottom
                    //@ts-ignore
                    transition="medium">
                    <Sheet.Frame>
                      <Sheet.ScrollView>
                        <Adapt.Contents />
                      </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay
                      bg="$shadowColor"
                      //@ts-ignore
                      transition="lazy"
                      enterStyle={{ opacity: 0 }}
                      exitStyle={{ opacity: 0 }}
                    />
                  </Sheet>
                </Adapt>

                <Select.Content>
                  <Select.ScrollUpButton
                    items="center"
                    justify="center"
                    position="relative"
                    width="100%"
                    height="$3"
                  >
                    <YStack z={10}>
                      <ChevronUp size={20} />
                    </YStack>
                    <LinearGradient
                      start={[0, 0]}
                      end={[0, 1]}
                      fullscreen
                      colors={['$background', 'transparent']}
                      rounded="$4"
                    />
                  </Select.ScrollUpButton>

                  <Select.Viewport
                    minW={200}
                    bg="$background"
                    rounded="$4"
                    borderWidth={1}
                    borderColor="$borderColor"
                  >
                    <Select.Group>
                      <Select.Label fontWeight="700">Districts</Select.Label>
                      {/* for longer lists memoizing these is useful */}
                      {React.useMemo(
                        () =>
                          districtlist.map((item, i) => {
                            return (
                              <Select.Item
                                index={i}
                                key={item.value}
                                value={item.value}
                              >
                                <Select.ItemText>{item.value}</Select.ItemText>
                                <Select.ItemIndicator marginLeft="auto">
                                  <Check size={16} />
                                </Select.ItemIndicator>
                              </Select.Item>
                            )
                          }),
                        [districtlist]
                      )}
                    </Select.Group>
                    {/* Native gets an extra icon */}
                    <YStack
                      position="absolute"
                      r={0}
                      t={16}
                      items="center"
                      justify="center"
                      width={'$4'}
                      pointerEvents="none"
                    >
                      <ChevronDown
                        size={'$11'}
                      />
                    </YStack>
                  </Select.Viewport>

                  <Select.ScrollDownButton
                    items="center"
                    justify="center"
                    position="relative"
                    width="100%"
                    height="$3"
                  >
                    <YStack z={10}>
                      <ChevronDown size={20} />
                    </YStack>
                    <LinearGradient
                      start={[0, 0]}
                      end={[0, 1]}
                      fullscreen
                      colors={['transparent', '$background']}
                      rounded="$4"
                    />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select>

              <Select
                value={ward}
                onValueChange={(text) => { setWard(text); getPlaces(region, district, text) }}
              >
                <Select.Trigger
                  maxWidth={190}
                  iconAfter={ChevronDown}
                  borderRadius="$4"
                  backgroundColor="$background"
                >
                  <Select.Value placeholder="Wards" />
                </Select.Trigger>

                <Adapt
                  //@ts-ignore
                  when="maxMd"
                  platform="touch">

                  <Sheet
                    native={true}
                    modal
                    dismissOnSnapToBottom
                    //@ts-ignore
                    transition="medium">
                    <Sheet.Frame>
                      <Sheet.ScrollView>
                        <Adapt.Contents />
                      </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay
                      bg="$shadowColor"
                      //@ts-ignore
                      transition="lazy"
                      enterStyle={{ opacity: 0 }}
                      exitStyle={{ opacity: 0 }}
                    />
                  </Sheet>
                </Adapt>

                <Select.Content>
                  <Select.ScrollUpButton
                    items="center"
                    justify="center"
                    position="relative"
                    width="100%"
                    height="$3"
                  >
                    <YStack z={10}>
                      <ChevronUp size={20} />
                    </YStack>
                    <LinearGradient
                      start={[0, 0]}
                      end={[0, 1]}
                      fullscreen
                      colors={['$background', 'transparent']}
                      rounded="$4"
                    />
                  </Select.ScrollUpButton>
                  <Select.Viewport
                    minW={200}
                    bg="$background"
                    rounded="$4"
                    borderWidth={1}
                    borderColor="$borderColor"
                  >
                    <Select.Group>
                      <Select.Label fontWeight="700">Wards</Select.Label>
                      {/* for longer lists memoizing these is useful */}
                      {React.useMemo(
                        () =>
                          wardlist.map((item, i) => {
                            return (
                              <Select.Item
                                index={i}
                                key={item.value}
                                value={item.value}
                              >
                                <Select.ItemText>{item.value}</Select.ItemText>
                                <Select.ItemIndicator marginLeft="auto">
                                  <Check size={16} />
                                </Select.ItemIndicator>
                              </Select.Item>
                            )
                          }),
                        [wardlist]
                      )}
                    </Select.Group>
                    {/* Native gets an extra icon */}
                    <YStack
                      position="absolute"
                      r={0}
                      t={16}
                      items="center"
                      justify="center"
                      width={'$4'}
                      pointerEvents="none"
                    >
                      <ChevronDown
                        size={'$11'}
                      />
                    </YStack>
                  </Select.Viewport>

                  <Select.ScrollDownButton
                    items="center"
                    justify="center"
                    position="relative"
                    width="100%"
                    height="$3"
                  >
                    <YStack z={10}>
                      <ChevronDown size={20} />
                    </YStack>
                    <LinearGradient
                      start={[0, 0]}
                      end={[0, 1]}
                      fullscreen
                      colors={['transparent', '$background']}
                      rounded="$4"
                    />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select>

              <Select
                value={places}
                onValueChange={(text) => { (text) => setPlaces(text) }}

              >
                <Select.Trigger
                  maxWidth={190}
                  iconAfter={ChevronDown}
                  borderRadius="$4"
                  backgroundColor="$background"
                >
                  <Select.Value placeholder="Places" />
                </Select.Trigger>
                <Adapt
                  //@ts-ignore
                  when="maxMd"
                  platform="touch">

                  <Sheet
                    native={true}
                    modal
                    dismissOnSnapToBottom
                    //@ts-ignore
                    transition="medium">
                    <Sheet.Frame>
                      <Sheet.ScrollView>
                        <Adapt.Contents />
                      </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay
                      bg="$shadowColor"
                      //@ts-ignore
                      transition="lazy"
                      enterStyle={{ opacity: 0 }}
                      exitStyle={{ opacity: 0 }}
                    />
                  </Sheet>
                </Adapt>

                <Select.Content>
                  <Select.ScrollUpButton
                    items="center"
                    justify="center"
                    position="relative"
                    width="100%"
                    height="$3"
                  >
                    <YStack z={10}>
                      <ChevronUp size={20} />
                    </YStack>
                    <LinearGradient
                      start={[0, 0]}
                      end={[0, 1]}
                      fullscreen
                      colors={['$background', 'transparent']}
                      rounded="$4"
                    />
                  </Select.ScrollUpButton>
                  <Select.Viewport
                    minW={200}
                    bg="$background"
                    rounded="$4"
                    borderWidth={1}
                    borderColor="$borderColor"
                  >
                    <Select.Group>
                      <Select.Label fontWeight="700">Places</Select.Label>
                      {/* for longer lists memoizing these is useful */}
                      {React.useMemo(
                        () =>
                          placeslist.map((item, i) => {
                            return (
                              <Select.Item
                                index={i}
                                key={item.value}
                                value={item.value}
                              >
                                <Select.ItemText>{item.value}</Select.ItemText>
                                <Select.ItemIndicator marginLeft="auto">
                                  <Check size={16} />
                                </Select.ItemIndicator>
                              </Select.Item>
                            )
                          }),
                        [placeslist]
                      )}
                    </Select.Group>
                    {/* Native gets an extra icon */}
                    <YStack
                      position="absolute"
                      r={0}
                      t={16}
                      items="center"
                      justify="center"
                      width={'$4'}
                      pointerEvents="none"
                    >
                      <ChevronDown
                        size={'$11'}
                      />
                    </YStack>
                  </Select.Viewport>

                  <Select.ScrollDownButton
                    items="center"
                    justify="center"
                    position="relative"
                    width="100%"
                    height="$3"
                  >
                    <YStack z={10}>
                      <ChevronDown size={20} />
                    </YStack>
                    <LinearGradient
                      start={[0, 0]}
                      end={[0, 1]}
                      fullscreen
                      colors={['transparent', '$background']}
                      rounded="$4"
                    />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select>
            </Contents800_2_flexdirection_no_bckgnd>

          </XStack>

        </ListItem>
      </YGroup.Item>

    </YGroup>

  )
}
