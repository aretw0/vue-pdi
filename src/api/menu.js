const Menu =  [
  {
    title: 'Operações',
    group: 'ops',
    icon: 'compare',
    name: 'operations',
    items: [
      {
        title: 'Aritméticas',
        name: 'arith',
        group: 'arith',
        items: true,
        children: [
          { name: 'sum', title: 'Soma' },
          { name: 'minus', title: 'Subtração' },
          { name: 'multi', title: 'Multiplicação' },
          { name: 'divid', title: 'Divisão'}
        ]
      },
      {
        title: 'Lógicas',
        name: 'logical',
        group: 'logical',
        items: true,
        children: [
          { name: 'and', title: 'E' },
          { name: 'or', title: 'Ou' },
          { name: 'xor', title: 'XOu' }
        ]
      }
    ]
  },
  { divider: true },
  {
    title: 'Componentes',
    icon: 'style',
    name: 'colorsspace',
    // chip: 'Cor',
    items: [
      { name: 'rgb', title: 'RGB' },
      { name: 'hsb', title: 'HSB' },
      { name: 'yuvhd', title: 'YUV HD' },
      { name: 'yuvsd', title: 'YUV SD' },
      { name: 'cmyk', title: 'CMYK' }
    ]
  },
  { divider: true },
  {
    title: 'Pseudocolorização',
    icon: 'brush',
    name: 'pseudocolor',
    items: [
      { name: 'fatia51', title: 'Fatiamento 51', chip: 'P&B' },
      { name: 'redis', title: 'Redistribuição', chip: 'Cor', color: 'orange' },
    ]
  },
  { divider: true },
  {
    title: 'Realce',
    icon: 'adjust',
    name: 'realce',
    items: [
      {
        title: 'Brilho/Contraste TL',
        name: 'bctl',
        group: 'adjust',
        items: true,
        children: [
          { name: 'gap', title: 'Intervalo' },
          { name: 'inverse', title: 'Inversa' }
        ]
      },
      {
        title: 'Brilho/Contraste TNL',
        name: 'bctnl',
        group: 'adjust',
        items: true,
        children: [
          { name: 'log', title: 'Logaritmo' },
          { name: 'root', title: 'Raiz quadrada' },
          { name: 'expon', title: 'Exponencial' },
          { name: 'square', title: 'Quadrado' }
        ]
      },
      { name: 'equal', title: 'Equalização' },
      { name: 'gama', title: 'Gama' }
    ]
  },
  { divider: true },
  {
    title: 'Filtragem',
    icon: 'filter',
    name: 'filter',
    items: [
      {
        title: 'Passa-Baixa',
        name: 'lowft',
        group: 'filter',
        items: true,
        children: [
          { 
            name: 'media',
            title: 'Média',
            group: 'lowft',
            items: true,
            children: [
                { name: 'media3', title: '3x3' },
                { name: 'media5', title: '5x5' }
            ]
          },
          { 
            name: 'mediana',
            title: 'Mediana',
            group: 'lowft',
            items: true,
            children: [
                { name: 'mediana3', title: '3x3' },
                { name: 'mediana5', title: '5x5' }
            ]
          },
          { name: 'max', title: 'Máximo' },
          { name: 'min', title: 'Mínimo' },
          { name: 'mode', title: 'Moda' },
          {
            name: 'bordersf',
            title: 'Preservar Bordas',
            group: 'lowft',
            items: true,
            children: [
                { name: 'kawa', title: 'Kawahara' },
                { name: 'nagmat', title: 'Nagao e Matsuyama' },
                { name: 'sombo', title: 'Somboonkaew' }
            ]
          }
        ]
      },
      {
        title: 'Passa-Alta',
        name: 'highft',
        group: 'filter',
        items: true,
        children: [
          { name: 'h1', title: 'H1' },
          { name: 'h2', title: 'H2' },
          { name: 'm1', title: 'M1' },
          { name: 'm2', title: 'M2' },
          { name: 'm3', title: 'M3' },
          { name: 'highbt', title: 'Alto reforço' }
        ]
      },
      {
        title: 'Meio-tom',
        name: 'halftone',
        group: 'filter',
        items: true,
        children: [
          { 
            name: 'po',
            title: 'Pontilhado Ordenado',
            group: 'halftone',
            items: true,
            children: [
                { name: 'po2x2', title: '2x2' },
                { name: 'po2x3', title: '2x3' },
                { name: 'po3x3', title: '3x3' }
            ]
          },
          { 
            name: 'pd',
            title: 'Pontilhado Difuso',
            group: 'halftone',
            items: true,
            children: [
                { name: 'floste', title: 'Floyd e Steinberg' },
                { name: 'jarjunin', title: 'Jarvis, Judice & Ninke' },
                { name: 'stucki', title: 'Stucki' },
                { name: 'stevarc', title: 'Stevenson e Arce' }
            ]
          }
        ]
      }
    ]
  },
  { divider: true },
  {
    title: 'Segmentação',
    icon: 'filter_b_and_w',
    name: 'segmentation',
    items: [
      {
        title: 'Pontos',
        name: 'dots',
        group: 'segmentation'
      },
      {
        title: 'Retas',
        name: 'strai',
        group: 'segmentation',
        items: true,
        children: [
          { name: 'horiz', title: 'Horizontal' },
          { name: 'vert', title: 'Vertical' },
          { name: 'a45', title: '45°' },
          { name: 'a135', title: '135°' }
        ]
      },
      {
        title: 'Bordas',
        name: 'bordersd',
        group: 'segmentation',
        items: true,
        children: [
          { name: 'robts', title: 'Roberts' },
          { name: 'crossrobts', title: 'Roberts Cruzado' },
          { name: 'krish', title: 'Krish' },
          { name: 'robin', title: 'Robinson' },
          { name: 'freche', title: 'Frey-Chen' },
          { 
            name: 'prew',
            title: 'Prewiit',
            group: 'bordersd',
            items: true,
            children: [
                { name: 'prewgx', title: 'Gx' },
                { name: 'prewgy', title: 'Gy' },
                { name: 'prewmag', title: 'Magnitude' }
            ]
          },
          { 
            name: 'sobel',
            title: 'Sobel',
            group: 'bordersd',
            items: true,
            children: [
                { name: 'sobelgx', title: 'Gx' },
                { name: 'sobelgy', title: 'Gy' },
                { name: 'sobelmag', title: 'Magnitude' }
            ]
          },
          { 
            name: 'lapla',
            title: 'Laplaciano',
            group: 'bordersd',
            items: true,
            children: [
                { name: 'laplah1', title: 'H1' },
                { name: 'laplah2', title: 'H2' },
            ]
          }
        ]
      },
      {
        title: 'Limiarização',
        name: 'limiar',
        group: 'segmentation',
        items: true,
        children: [
          { name: 'glob', title: 'Global' },
          { 
            name: 'lccal',
            title: 'Local',
            group: 'limiar',
            items: true,
            children: [
                { name: 'medlim', title: 'Média' },
                { name: 'minlim', title: 'Mínimo ' },
                { name: 'maxlim', title: 'Máximo ' },
                { name: 'niblack', title: 'Niblack' }
            ]
          }
        ]
      },
      {
        title: 'Regiões',
        name: 'region',
        group: 'segmentation',
        items: true,
        children: [
          { name: 'regcres', title: 'Crescimento' },
          { title: 'Watersheld', name: 'watersheld', group: 'segmentation' }
        ]
      }
    ]
  }
];
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
