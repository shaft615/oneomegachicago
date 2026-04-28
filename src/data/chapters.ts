export interface Chapter {
  id:          string
  name:        string
  designation: string
  area:        string
  basileus:    string
  website?:    string
}

export const chapters: Chapter[] = [
  {
    id: 'ax',
    name: 'Alpha Chi',
    designation: 'AX',
    area: 'Gary, Indiana',
    basileus: 'Bro. Alex Dunlap',
    website: 'https://alphachiques.com'
  },
  {
    id: 'akk',
    name: 'Alpha Kappa Kappa',
    designation: 'AKK',
    area: 'Chicagoland',
    basileus: 'Bro. Christopher Vincent',
    website: undefined
  },
  {
    id: 'xll',
    name: 'Chi Lambda Lambda',
    designation: 'XLL',
    area: 'Chicagoland',
    basileus: 'Bro. Karl Bryant',
    website: 'https://www.chilambdalambda.com'
  },
  {
    id: 'ee',
    name: 'Epsilon Eta',
    designation: 'EE',
    area: 'Chicagoland',
    basileus: 'Bro. Daniel Piolet',
    website: undefined
  },
  {
    id: 'iota',
    name: 'Iota',
    designation: 'Ι',
    area: 'Chicagoland',
    basileus: 'Bro. Eddie Morrow',
    website: 'https://iotachapterques.org'
  },
  {
    id: 'mx',
    name: 'Mu Xi',
    designation: 'ΜΞ',
    area: 'Chicagoland',
    basileus: 'Bro. Bryce O. Walker',
    website: 'https://muxichapter.org'
  },
  {
    id: 'np',
    name: 'Nu Pi',
    designation: 'ΝΠ',
    area: 'Chicagoland',
    basileus: 'Bro. DeMarco Hughes',
    website: 'https://www.nupiques.org'
  },
  {
    id: 'omm',
    name: 'Omicron Mu Mu',
    designation: 'ΟΜΜ',
    area: 'Lansing / South Suburban',
    basileus: 'Bro. Darren Brady',
    website: 'https://omicronmumu.com'
  },
  {
    id: 'rgg',
    name: 'Rho Gamma Gamma',
    designation: 'ΡΓΓ',
    area: 'Chicagoland',
    basileus: 'Bro. Willie Baker',
    website: 'https://rhogammagamma.org'
  },
  {
    id: 'rmm',
    name: 'Rho Mu Mu',
    designation: 'ΡΜΜ',
    area: 'Chicagoland',
    basileus: 'Bro. Vince Davis',
    website: 'https://www.pmmques.org'
  },
  {
    id: 'rt',
    name: 'Rho Tau',
    designation: 'PT',
    area: 'Chicagoland',
    basileus: 'Bro. Tommy Anderson',
    website: 'https://www.rhotau1961.org'
  },
  {
    id: 'so',
    name: 'Sigma Omega',
    designation: 'ΣΩ',
    area: 'South Suburban',
    basileus: 'Bro. Dathon K. O\'Banion',
    website: 'https://www.sigma-omega.org'
  },
  {
    id: 'tkk',
    name: 'Theta Kappa Kappa',
    designation: 'ΘΚΚ',
    area: 'Chicagoland',
    basileus: 'Bro. Mauricio Rainey',
    website: 'https://tkkomegas.org'
  },
]