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
    link: 'https://example.com/1',
  },
  {
    image: Image2,
    title: 'Ductable AC',
    link: 'https://example.com/2',
  },
  {
    image: Image3,
    title: 'VRV/VRF',
    link: 'https://example.com/3',
  },
  {
    image: Image4,
    title: 'Cassete AC',
    link: 'https://example.com/4',
  },
  {
    image: Image5,
    title: 'Chiller AC',
    link: 'https://example.com/5',
  },
  {
    image: Image6,
    title: 'AHU (Air Handling Unit)',
    link: 'https://example.com/6',
  },
  {
    image: Image7,
        title: 'FCU (Fall COil Unit)',
    link: 'https://example.com/7',
  },
  {
    image: Image8,
    title: 'Package AC',
    link: 'https://example.com/8',
  },
  {
    image: Image9,
    title: 'Plumbing',
    link: 'https://example.com/9',
  },
  {
    image: Image10,
    title: 'Drainage System',
    link: 'https://example.com/10',
  },
  {
    image: Image11,
    title: 'Fire Fighting',
    link: 'https://example.com/11',
  },
  {
    image: Image12,
    title: 'Electricals',
    link: 'https://example.com/12',
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
