import { IonContent, IonHeader, IonBackButton, IonPage, IonButtons, IonTitle, IonToolbar, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';

import './Elemento1.css';

interface ElData {
    num: number;
    name: string;
    img: string;
    desc: string;
}

const EleData: ElData[] = [
    {
        num: 1,
        name: 'Reduce the Amount of Waste We Generate',
        img: '../../assets/wastes.png',
        desc: 'Minimizing waste helps prevent overfilled landfills and reduces pollution from incineration, both of which release harmful substances like methane and toxins into the environment. Reusing items—such as containers, clothing, or packaging—can significantly cut the total volume of waste produced. A zero-waste strategy that emphasizes reuse could reduce greenhouse gas emissions equivalent to shutting down 80 coal power plants by 2030 (GAIA, 2019), highlighting the large-scale impact of small daily choices.'
    },
    {
        num: 2,
        name: 'Save Natural Resources',
        img: '../../assets/resources.png',
        desc: 'Reusing materials reduces the demand for virgin resources like wood, metals, sand, and fossil fuels. For example, recycling one ton of office paper saves over two tons of wood, while reusing aluminum avoids the need to mine bauxite and saves 95% of the energy used in primary production. By giving materials a second life, we reduce pressure on ecosystems and help preserve finite resources for future generations (EPA, 2023).'
    },
    {
        num: 3,
        name: 'Decrease Air, Water, and Soil Pollution',
        img: '../../assets/pollution.png',
        desc: 'The extraction and processing of raw materials release pollutants into air, water, and soil, threatening ecosystems and human health. Reusing items reduces the need for these activities, cutting emissions and chemical waste. Recycling paper, for instance, produces 74% less air pollution and 35% less water pollution compared to making it from raw pulp (Environmental Paper Network, 2018), while reuse of plastics helps prevent microplastic contamination of natural environments.'
    }, {
        num: 4,
        name: 'Avoid Extracting and Processing New Resources by Reusing',
        img: '../../assets/reusing.png',
        desc: 'Reusing glass, plastic, or metal avoids the environmental costs of mining, drilling, or refining. For instance, reusing glass cullet can save over 300 kg of CO₂ per ton and reduce energy used for melting by up to 30%. Lifecycle studies show that reuse reduces greenhouse gas emissions up to 88% more than recycling (Ellen MacArthur Foundation, 2021), making it one of the most effective strategies for sustainable consumption.'
    }, {
        num: 5,
        name: 'Reduce Energy Consumption and Greenhouse Gas Emissions',
        img: '../../assets/energy.png',
        desc: 'Reusing materials cuts the energy required for production, which in turn lowers greenhouse gas emissions. Producing recycled aluminum, for example, uses only 5% of the energy needed to make it from raw ore, and recycling glass and plastic saves significant electricity and fossil fuel use. In 2018, U.S. recycling and composting avoided 193 million metric tons of CO₂-equivalent emissions, and global reuse models could reduce emissions by up to 80% in key sectors (WRAP, 2022; EPA, 2023).'
    }
];

function Elemento1() {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton className='back-button' defaultHref="/informacion" />
                    </IonButtons>
                </IonToolbar>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
            </IonHeader>


            <IonContent className="modern-content" fullscreen>
                <div className="main-title">♻️ IMPORTANCE OF RECYCLING</div>
                <div className="card-container">
                    {EleData.map((item) => (
                        <IonCard key={item.num} className="modern-card">
                            <IonImg src={item.img} alt={item.name} className="card-image" />
                            <IonCardHeader>
                                <IonCardTitle className="card-title">{item.name}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent className="card-desc">{item.desc}</IonCardContent>
                        </IonCard>
                    ))}
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Elemento1;