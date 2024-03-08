/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
require('cbor-rn-prereqs');
import { Cbor } from 'mdl-ts';
import { MobileDocument } from 'mdl-ts';
import { Hex } from 'mdl-ts';
global.Buffer = global.Buffer || require('buffer').Buffer

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button
            title='someButton'
            onPress={() => {
              console.log('Button clicked');
              const credential = "a267646f6354797065756f72672e69736f2e31383031332e352e312e6d444c6c6973737565725369676e6564a26a6e616d65537061636573a2716f72672e69736f2e31383031332e352e3183d818a4686469676573744944006672616e646f6d5820f990db9d3f31fe0bcc71b8d9da972727393737858fee591c317a97aa84a6bb5071656c656d656e744964656e7469666965726a62697274685f646174656c656c656d656e7456616c7565d903ec6a313932322d30332d3133d818a4686469676573744944016672616e646f6d5820f99b1b7efd6322944bafc4b4fa49a2deb6ac3f2b6434505140572fb8ea033fa671656c656d656e744964656e7469666965726a676976656e5f6e616d656c656c656d656e7456616c7565684d61736365747469d818a4686469676573744944026672616e646f6d582080abcac6520009426b39f85a42d1339d5dcec03e12553600744a1ac9b835fdbd71656c656d656e744964656e7469666965726b66616d696c795f6e616d656c656c656d656e7456616c7565695261666661656c6c6f776f72672e69736f2e31383031332e352e312e61616d766181d818a4686469676573744944036672616e646f6d5820a4061e713a1cd2de4e7a0e3c82e42c9dc38c91d97304398b75c2f9635794e1c171656c656d656e744964656e7469666965726b6f7267616e5f646f6e6f726c656c656d656e7456616c7565f56a6973737565724175746884590220a30126044864656d6f2d6b6964182159020e3082020a308201afa00302010202142d1052653a7961ad433efb6130c081ec59926917300a06082a8648ce3d0403023064310b30090603550406130255533113301106035504080c0a43616c69666f726e69613116301406035504070c0d53616e204672616e636973636f31133011060355040a0c0a4d7920436f6d70616e793113301106035504030c0a6d79736974652e636f6d301e170d3234303232393230303832315a170d3234303331303230303832315a3064310b30090603550406130255533113301106035504080c0a43616c69666f726e69613116301406035504070c0d53616e204672616e636973636f31133011060355040a0c0a4d7920436f6d70616e793113301106035504030c0a6d79736974652e636f6d3059301306072a8648ce3d020106082a8648ce3d030107034200041fe495e95f99651cd54bcecd40519df87ffd07e2b6e6c210f1f4d7bcf69bd5394bef706adffdd840bb80a9a277d09ae22052eec86eda3a13cbd523435c0ae17fa33f303d303b0603551d1104343032863068747470733a2f2f63726564656e7469616c2d6973737565722e6f6964632d66656465726174696f6e2e6f6e6c696e65300a06082a8648ce3d04030203490030460221009d7fca4a0d2f3b1d8c3b804815e2e3ecf2529cbaa7f0d3be467a4f70e2fa08230221008a22ea45890427cc073e4c4ebba06c212bcd77d588d37976f8604e4b99ea5488a1182159020d30820209308201afa00302010202146f047ad1192db5f75dd6e193fac7effe83c69e25300a06082a8648ce3d0403023064310b30090603550406130255533113301106035504080c0a43616c69666f726e69613116301406035504070c0d53616e204672616e636973636f31133011060355040a0c0a4d7920436f6d70616e793113301106035504030c0a6d79736974652e636f6d301e170d3234303232393230303832315a170d3234303331303230303832315a3064310b30090603550406130255533113301106035504080c0a43616c69666f726e69613116301406035504070c0d53616e204672616e636973636f31133011060355040a0c0a4d7920436f6d70616e793113301106035504030c0a6d79736974652e636f6d3059301306072a8648ce3d020106082a8648ce3d030107034200041fe495e95f99651cd54bcecd40519df87ffd07e2b6e6c210f1f4d7bcf69bd5394bef706adffdd840bb80a9a277d09ae22052eec86eda3a13cbd523435c0ae17fa33f303d303b0603551d1104343032863068747470733a2f2f63726564656e7469616c2d6973737565722e6f6964632d66656465726174696f6e2e6f6e6c696e65300a06082a8648ce3d040302034800304502204ef26e4941c7ebe6d7392703f0eccb4e29d1c00850109fe62b5ec442b46be04a022100cb5a4a90249ced643a52706050f9d587826a311d2ad916053a2cc468e35cb8505901d7a66776657273696f6e63312e306f646967657374416c676f726974686d667368613235366c76616c756544696765737473a2716f72672e69736f2e31383031332e352e31a300582083ba8fadd7b38f3b2e6b4c15bd558367c8b01b78b38f6f363ff91b06baf28ca301582063820fe8b5aacb38029fffb2654b5e92d49dda7194c30e0a75f2c718be5fdffb025820ea4c04a78460583dba0a33c0ab021339c2372bc44297a53c5ef1ecc29df11a41776f72672e69736f2e31383031332e352e312e61616d7661a10358202560077d024a813faef4d5e4f76ffdb95b547a1fa116c6b2459bca820a55a71d6d6465766963654b6579496e666fa1696465766963654b6579a4010220012158201fe495e95f99651cd54bcecd40519df87ffd07e2b6e6c210f1f4d7bcf69bd5392258204bef706adffdd840bb80a9a277d09ae22052eec86eda3a13cbd523435c0ae17f67646f6354797065716f72672e69736f2e31383031332e352e316c76616c6964697479496e666fa3667369676e656456c074323032342d30332d30365431333a35353a33325a6976616c696446726f6d56c074323032342d30332d30365431333a35353a33325a6a76616c6964556e74696c56c074323032392d30332d30355431333a35353a33325a584039bbbea708d8920b4951c67c4c9a6c03e901aa4c4578b7fadcbeb67a6b38b813bd61d0a9d96c24b15a22b3fb2ce476ec98d5405e19e9ecab48acff0fd885033e";
              const issuerSigned = Cbor.decode(MobileDocument, Hex.decode(credential));
              console.log(issuerSigned.docType);
              const caKeyPair = rs.KEYUTIL.generateKeypair("EC", "secp256k1");

              /*
              var hashAlg = "SHA1withRSA";
              console.log('Button clicked');
              
              var sig = new rs.KJUR.crypto.Signature({alg: hashAlg});
              var prvKey = kp.prvKeyObj;
              sig.init(prvKey);
              sig.updateString('aaa');
              var sigHex = sig.sign();
              console.log('Signature: ' + sigHex);
              //const issuerSigned = Cbor.decode(MobileDocument, Hex.decode(''));
              */
              console.log('End clicked');
              
            }}                                 
          />
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
