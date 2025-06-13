import { IonContent, IonButtons, IonHeader, IonBackButton, IonPage, IonToolbar, IonTitle, IonImg } from '@ionic/react';
import './Elemento2.css';

interface BinData {
    color: string;
    name: string;
    img: string;
    desc: string;
}

const bins: BinData[] = [
    {
        color: '#1E90FF',
        name: 'Paper and Cardboard',
        img: '../../assets/blue.png',
        desc: 'Newspapers, magazines, office paper, notebooks, cardboard and paper packaging.'
    },
    {
        color: '#32CD32',
        name: 'Glass',
        img: '../../assets/green.png',
        desc: 'Glass bottles, glass jars, and other glass containers.'
    },
    {
        color: '#FFD700',
        name: 'Plastic and Metal Containers',
        img: '../../assets/yellow.png',
        desc: 'Plastic bottles, aluminum cans, tetra paks, metal food tins.'
    },
    {
        color: '#000000',
        name: 'General Waste (Non-Recyclable)',
        img: '../../assets/black.png',
        desc: 'Food-contaminated items, diapers, broken ceramics or mirrors, styrofoam (in some regions).'
    },
    {
        color: '#8B4513',
        name: 'Organic Waste / Compost',
        img: '../../assets/brown.png',
        desc: 'Food scraps, coffee grounds, tea bags, yard trimmings, leaves and eggshells.'
    },
    {
        color: '#FF6347',
        name: 'Hazardous or Electronic Waste (e-waste)',
        img: '../../assets/red.png',
        desc: 'Batteries, electronics (phones, chargers), chemicals, paints, and other hazardous materials.'
    },
    {
        color: '#32CD32',
        name: 'Inorgánicos reciclables (Recyclable Inorganic Waste)',
        img: '../../assets/green.png',
        desc: 'Plastic bottles and containers (clean), paper and cardboard, glass bottles and jars, aluminum cans and metal tins, Tetra Pak containers.'
    },
    {
        color: '#000000',
        name: 'Inorgánicos no reciclables (Non-Recyclable Inorganic Waste)',
        img: '../../assets/black.png',
        desc: 'Cigarette butts, sanitary pads and diapers, ceramics, broken glass or mirrors, styrofoam (depending on municipality), candy/chip wrappers and laminated packaging.'
    }, {
        color: '#8B0000',
        name: 'Orgánicos (Organic Waste)',
        img: '../../assets/brown.png',
        desc: 'Food scraps (fruit and vegetable peels, leftovers), coffee grounds and tea bags, garden waste (leaves, small branches), eggshells'
    }, {
        color: '#FF4500',
        name: 'Residuos peligrosos o especiales (Hazardous or Special Waste)',
        img: '../../assets/red.png',
        desc: 'Batteries, electronic devices and cables, medicines and expired pharmaceuticals, paint, solvents, and chemicals.'
    }, {
        color: '#FFD700',
        name: '(Sometimes used for Plastics only)',
        img: '../../assets/yellow.png',
        desc: 'Plastic bottles, plastic containers, plastic bags (if clean and allowed).'
    }
];

// Divide los bins
const binsBeforeMexico = bins.slice(0, 6);
const binsAfterMexico = bins.slice(6);

const Elemento2: React.FC = () => (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton className='back-button' defaultHref="/informacion" />
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent className="timeline-content" fullscreen>
            <div className="main-title2">🗑️ RECYCLING BINS</div>
            <div className="timeline">
                {binsBeforeMexico.map((bin, idx) => (
                    <div className="timeline-item" key={idx}>
                        <div className="timeline-dot" style={{ background: bin.color }} />
                        <div className="timeline-card" style={{ borderLeft: `10px solid ${bin.color}`, borderRight: `10px solid ${bin.color}` }}>
                            <IonImg src={bin.img} alt={bin.name} className="timeline-img" />
                            <div className="timeline-info">
                                <h2 style={{ color: bin.color }}>{bin.name}</h2>
                                <p>{bin.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='title-mexico'>
                In Mexico:
            </div>
            <div className="timeline">
                {binsAfterMexico.map((bin, idx) => (
                    <div className="timeline-item" key={idx + 6}>
                        <div className="timeline-dot" style={{ background: bin.color }} />
                        <div className="timeline-card" style={{ borderLeft: `10px solid ${bin.color}`, borderRight: `10px solid ${bin.color}` }}>
                            <IonImg src={bin.img} alt={bin.name} className="timeline-img" />
                            <div className="timeline-info">
                                <h2 style={{ color: bin.color }}>{bin.name}</h2>
                                <p>{bin.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </IonContent>
    </IonPage>
);

export default Elemento2;