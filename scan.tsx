import React, { Component, Fragment } from 'react';
import { TouchableOpacity, Text, View, Image, ImageBackground, BackHandler } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './scanStyle';
import axios, { AxiosResponse, AxiosInstance } from 'axios';
import { Cbor, Hex, MobileDocument, OpenID4VCIClient } from 'mdl-ts';
class Scan extends Component {
    private issuerSigned: any;
    constructor(props: any) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null
        };
    }
    onSuccess = async (e: any) => {
        this.setState({
            result: null,
            scan: false,
            ScanResult: false
        })
        
        try { 
            const holder = new OpenID4VCIClient({kid: "123", did: "did:example:123", privKeyHex: "123"});
            //console.log('credentials2: ' + e.data);
            const credentials2 = await holder.getCredentialFromOffer(e.data);
            //console.log('credentials2: ' + JSON.stringify(credentials2)); 
            const issuerSigned = Cbor.decode(MobileDocument, Hex.decode(credentials2[0]));
            const mDL: any = {};
            mDL.docType = issuerSigned.docType;
            let mDLNamespace = issuerSigned?.issuerSigned?.namespaces.get('org.iso.18013.5.1');
            if (mDLNamespace) {
                for (const issuerItem of mDLNamespace) {
                    if (issuerItem.elementIdentifier === 'given_name') mDL.firstName = issuerItem.elementValue;
                    if (issuerItem.elementIdentifier === 'family_name') mDL.lastName = issuerItem.elementValue;
                }
            }
            this.setState({
                result: mDL,
                scan: false,
                ScanResult: true
            })
        } catch (e) {
            console.log('error: ' + e); 
        }
        /*
        const qrCodeData = e.data.replace('openid-credential-offer://?credential_offer=','');
        const credentialOffer = JSON.parse(decodeURIComponent(qrCodeData));

        const credentialIssuerUrl = credentialOffer.credential_issuer;
        const credentials = credentialOffer.credentials;
        const grants = credentialOffer.grants;
        let pre: string = ''; 
        for (const property in grants) {
            if (property === 'urn:ietf:params:oauth:grant-type:pre-authorized_code') {
                pre = grants[property]['pre-authorized_code'];
            }
        }
        let accessTokenRequest: any = {
            "grant_type": "urn:ietf:params:oauth:grant-type:pre-authorized_code",
            "pre-authorized_code": pre
        };
        //console.log('credentialIssuerUrl: ' + credentialIssuerUrl);

        const params = {
            format: 'json',
            option: 'value'
          };
          
        const data = Object.keys(accessTokenRequest)
            .map((key) => `${key}=${encodeURIComponent(accessTokenRequest[key])}`)
            .join('&');
          
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data,
            url: `${credentialIssuerUrl}/token`,
        };

        let client: AxiosInstance;
        client = axios.create();  
        const accessTokenResponse: AxiosResponse = await client(options);
        const accessToken = accessTokenResponse.data;

        //console.log('accessToken: ' + JSON.stringify(accessToken));

        let credentialRequest: any = {
            "format": "mso_mdoc",
//            "doctype": "org.iso.18013.5.1.mDL",
            "proof": 
            { 
                "proof_type": "cwt", 
                "cwt" : null 
            }
        };

        const credentialResponse: AxiosResponse = await client.post(`${credentialIssuerUrl}/credential`, credentialRequest, { headers: { 'Authorization': 'BEARER ' + accessToken.access_token } });  
        
        
        const issuerSigned = Cbor.decode(MobileDocument, Hex.decode(credentialResponse.data.credential));
        const mDL: any = {};
        mDL.docType = issuerSigned.docType;
        let mDLNamespace = issuerSigned?.issuerSigned?.namespaces.get('org.iso.18013.5.1');
        if (mDLNamespace) {
            for (const issuerItem of mDLNamespace) {
                if (issuerItem.elementIdentifier === 'given_name') mDL.firstName = issuerItem.elementValue;
                if (issuerItem.elementIdentifier === 'family_name') mDL.lastName = issuerItem.elementValue;
            }
        }
        this.setState({
            result: mDL,
            scan: false,
            ScanResult: true
        })
        */
    }
    activeQR = () => {
        this.setState({ scan: true })
    }
    scanAgain = () => {
        this.setState({ scan: true, ScanResult: false })
    }
    render() {
        const { scan, ScanResult, result } = this.state
        return (
            <View style={styles.scrollViewStyle}>
                <Fragment>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={()=> BackHandler.exitApp()}>
                            <Image source={require('./assets/back.png')} style={{height: 36, width: 36}}></Image>
                        </TouchableOpacity>
                        <Text style={styles.textTitle}>Balayer Code QR</Text>
                    </View>
                    {!scan && !ScanResult &&
                        <View style={styles.cardView} >
                            <Image source={require('./assets/camera.png')} style={{height: 36, width: 36}}></Image>
                            <Image source={require('./assets/qr-code.png')} style={{margin: 20}}></Image>
                            <TouchableOpacity onPress={this.activeQR} style={styles.buttonScan}>
                                <View style={styles.buttonWrapper}>
                                <Image source={require('./assets/camera.png')} style={{height: 36, width: 36}}></Image>
                                <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>Balayer Code QR</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    {ScanResult &&
                        <Fragment>
                            <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                                <Text>PERMIS DE CONDUIRE NUMÉRIQUE</Text>
                                <Text>ISO mDL (18013-5:2021)</Text>
                                <Text> </Text>
                                <Text>Type Document : {result.docType}</Text>
                                <Text>Nom: {result.lastName}</Text>
                                <Text>Prénom : {result.firstName}</Text>
                                <Text>Taille (cm) : </Text>
                                <Text>Couleur Yeux : </Text>
                                <Text>Date Naissance : 03/04/2024</Text>
                                <Text> </Text>
                                <Text>No. Porte : </Text>
                                <Text>Nom Rue : </Text>
                                <Text>Ville : </Text>
                                <Text>Code Postal : </Text>
                                <Text> </Text>
                                <Text>Numéro Permis Conduire : </Text>
                                <Text>Numéro Référence : </Text>
                                <Text>Classe(s) : </Text>
                                <Text>Condition(s) : </Text>
                                <TouchableOpacity onPress={this.scanAgain} style={styles.buttonScan}>
                                    <View style={styles.buttonWrapper}>
                                        <Image source={require('./assets/camera.png')} style={{height: 36, width: 36}}></Image>
                                        <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>Appuyer pour balayer</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Fragment>
                    }
                    {scan &&
                        <QRCodeScanner
                            reactivate={true}
                            showMarker={true}
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                            topContent={
                                <Text style={styles.centerText}>
                                   Please move your camera {"\n"} over the QR Code
                                </Text>
                            }
                            bottomContent={
                                <View>
                                    <ImageBackground source={require('./assets/bottom-panel.png')} style={styles.bottomContent}>
                                        <TouchableOpacity style={styles.buttonScan2} 
                                            onPress={() => this.scanner.reactivate()} 
                                            onLongPress={() => this.setState({ scan: false })}>
                                            <Image source={require('./assets/camera2.png')}></Image>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                </View>
                            }
                        />
                    }
                </Fragment>
            </View>
        );
    }
}
export default Scan;