import Head from "@modules/common/components/head"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

/*import '@ionic/react/css/core.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
*/import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonActionSheet,
  IonMenu,
  IonMenuButton,
} from '@ionic/react';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import * as React from "react";
// Call the element loader after the platform has been bootstrapped




const Home: NextPageWithLayout = () => {
  React.useEffect(() => {
    defineCustomElements(window)
    }, [])
  return (
    <>
      <Head
        title="Home"
        description="Shop all available models only at the ACME. Worldwide Shipping. Secure Payment."
      />
       <IonPage>
      <IonHeader>
        <IonToolbar>
      <IonTitle>Home</IonTitle> 
      <IonButtons>
        <IonMenuButton />
      </IonButtons>
      </IonToolbar>
      </IonHeader>
    
      <IonContent className="ion-padding" fullscreen>
      
      <Hero />
      <FeaturedProducts />
      </IonContent>
    </IonPage>
    </>
  )
}



Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>

}


export default Home
