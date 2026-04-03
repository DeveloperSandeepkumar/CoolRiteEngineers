import React from 'react';
import Card from '../Component/Card';
import Image1 from '../../src/Assets/Colrite_files/1.jpg'
import Image2 from '../../src/Assets/Colrite_files/2.jpg'
import Image3 from '../../src/Assets/Colrite_files/3.jpg'
import Image4 from '../../src/Assets/Colrite_files/4.jpg'
import Image5 from '../../src/Assets/Colrite_files/5.jpg'
import Image6 from '../../src/Assets/Colrite_files/6.jpg'
import Image7 from '../../src/Assets/Colrite_files/7.jpg'
import Image8 from '../../src/Assets/Colrite_files/8.jpg'
import Image9 from '../../src/Assets/Colrite_files/9.jpg'
import Image10 from '../../src/Assets/Colrite_files/10.jpg'
import Image11 from '../../src/Assets/Colrite_files/11.jpg'
import Image12 from '../../src/Assets/Colrite_files/12.jpg'

const cardsData = [
  {
    image: Image1,
    title: 'AC Installation',
    link: '/ac-installation',
  },
  {
    image: Image2,
    title: 'Ductable AC',
    link: '/ductable-ac',
  },
  {
    image: Image3,
    title: 'VRV/VRF',
    link: './vrv-vrf',
  },
  {
    image: Image4,
    title: 'Cassete AC',
    link: './cassette-ac',
  },
  {
    image: Image5,
    title: 'Chiller AC',
    link: './chiller-ac',
  },
  {
    image: Image6,
    title: 'AHU (Air Handling Unit)',
    link: './ahu-services',
  },
  {
    image: Image7,
        title: 'FCU (Fall COil Unit)',
    link: './fcu-services',
  },
  {
    image: Image8,
    title: 'Package AC',
    link: './package-ac',
  },
  {
    image: Image9,
    title: 'Plumbing',
    link: './plumbing',
  },
  {
    image: Image10,
    title: 'Drainage System',
    link: './drainage-system',
  },
  {
    image: Image11,
    title: 'Fire Fighting',
    link: './fire-fighting',
  },
  {
    image: Image12,
    title: 'Electricals',
    link: './electrical-services',
  },
];

const CardList = () => {
  return (
    <div style={styles.container}>
      {cardsData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
};

export default CardList;
