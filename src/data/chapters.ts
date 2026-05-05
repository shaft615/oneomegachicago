export interface Chapter {
  id:          string
  name:        string
  designation: string
  area:        string
  basileus:    string
  website?:    string
  logo?:       string
}

// Ordered chronologically by charter year (oldest first).
export const chapters: Chapter[] = [
  {
    id: 'iota',
    name: 'Iota',
    designation: 'Ι',
    area: 'Chicagoland',
    basileus: 'Bro. Eddie Morrow',
    website: 'https://iotachapterques.org',
    logo: '/chapters/iota.png'
  },
  {
    id: 'so',
    name: 'Sigma Omega',
    designation: 'ΣΩ',
    area: 'South Suburban',
    basileus: 'Bro. Dathon K. O\'Banion',
    website: 'https://www.sigma-omega.org',
    logo: '/chapters/so.png'
  },
  {
    id: 'ax',
    name: 'Alpha Chi',
    designation: 'AX',
    area: 'Gary, Indiana',
    basileus: 'Bro. Alex Dunlap',
    website: 'https://alphachiques.com',
    logo: '/chapters/ax.png'
  },
  {
    id: 'rt',
    name: 'Rho Tau',
    designation: 'PT',
    area: 'Chicagoland',
    basileus: 'Bro. Tommy Anderson',
    website: 'https://www.rhotau1961.org',
    logo: undefined
  },
  {
    id: 'np',
    name: 'Nu Pi',
    designation: 'ΝΠ',
    area: 'Chicagoland',
    basileus: 'Bro. DeMarco Hughes',
    website: 'https://www.nupiques.org',
    logo: '/chapters/np.png'
  },
  {
    id: 'ee',
    name: 'Epsilon Eta',
    designation: 'ΕΗ',
    area: 'Chicagoland',
    basileus: 'Bro. Daniel Piolet',
    website: undefined,
    logo: undefined
  },
  {
    id: 'mx',
    name: 'Mu Xi',
    designation: 'ΜΞ',
    area: 'Chicagoland',
    basileus: 'Bro. Bryce O. Walker',
    website: 'https://muxichapter.org',
    logo: '/chapters/mx.png'
  },
  {
    id: 'rgg',
    name: 'Rho Gamma Gamma',
    designation: 'ΡΓΓ',
    area: 'Chicagoland',
    basileus: 'Bro. Willie Baker',
    website: 'https://rhogammagamma.org',
    logo: '/chapters/rgg.png'
  },
  {
    id: 'akk',
    name: 'Alpha Kappa Kappa',
    designation: 'AKK',
    area: 'Chicagoland',
    basileus: 'Bro. Christopher Vincent',
    website: undefined,
    logo: undefined
  },
  {
    id: 'tkk',
    name: 'Theta Kappa Kappa',
    designation: 'ΘΚΚ',
    area: 'Chicagoland',
    basileus: 'Bro. Mauricio Rainey',
    website: 'https://tkkomegas.org',
    logo: '/chapters/tkk.png'
  },
  {
    id: 'xll',
    name: 'Chi Lambda Lambda',
    designation: 'ΧΛΛ',
    area: 'Chicagoland',
    basileus: 'Bro. Karl Bryant',
    website: 'https://www.chilambdalambda.com',
    logo: '/chapters/xll.png'
  },
  {
    id: 'omm',
    name: 'Omicron Mu Mu',
    designation: 'ΟΜΜ',
    area: 'Lansing / South Suburban',
    basileus: 'Bro. Darren Brady',
    website: 'https://omicronmumu.com',
    logo: '/chapters/omm.png'
  },
  {
    id: 'rmm',
    name: 'Rho Mu Mu',
    designation: 'ΡΜΜ',
    area: 'Chicagoland',
    basileus: 'Bro. Vince Davis',
    website: 'https://www.pmmques.org',
    logo: '/chapters/rmm.png'
  },
]

export const TOTAL_CHAPTERS = chapters.length;

export function getChaptersByType(type: string): Chapter[] {
  return chapters.filter((chapter) => chapter.area === type);
}
