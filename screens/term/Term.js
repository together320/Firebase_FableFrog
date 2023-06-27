import React, {useState, useContext} from 'react'
import { View, ScrollView, FlatList, SafeAreaView} from 'react-native'
import Text from '../../components/MyText'
import { PrimaryText, PrimaryTextLarge } from '../../components/FableText'
import FableNavigation from '../../components/FableNavigation'
import OctiIcons from 'react-native-vector-icons/Octicons'

export default function TermScreen(props) {
    

    return (
    <>
    <View class="flex">
        <ScrollView className="flex flex-col h-screen px-[32]  pt-[60] m-[0] bg-[#FBFAFD]">
            <PrimaryTextLarge className="pb-[15]">
                Terms & Conditions
            </PrimaryTextLarge>
            <PrimaryText className="pb-[15]">
                Last updated: July 05, 2021{'\n'}{'\n'}
                This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                {'\n'}{'\n'}
                We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the Privacy Policy Generator.
            </PrimaryText>
            <PrimaryTextLarge className="pb-[10]">
                Interpretation and Definitions
            </PrimaryTextLarge>
            <PrimaryTextLarge className="pb-[10]">
                Interpretation
            </PrimaryTextLarge>
            <PrimaryText className="pb-[10]">
                The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
            </PrimaryText>
            <PrimaryTextLarge>
                Definitions
            </PrimaryTextLarge>
            <View style={{ padding: 10 }}>
            {
                data1.map((item, index) => (
                    <View className="flex flex-row pr-[20]" style={{ marginBottom: 10 }} key={index}>
                        <View className="flex-row">
                            <View className="items-center mt-[4] mr-[5]">
                                <OctiIcons name="dot-fill" size={15} color="#262259"/>
                            </View>
                        </View>
                        <View className="flex-row flex-1 ml-[4]">
                            <Text className="text-[17px] font-bold text-[#262259]">{item.key}<Text className="text-[17px] flex-wrap text-[#262259]">{item.data}</Text></Text>
                            
                        </View>
                    </View>
                ))
            }
            </View>
            <PrimaryTextLarge className="pb-[10]">
                Collecting and Using Your Personal Data
            </PrimaryTextLarge>
            <PrimaryTextLarge className="pb-[10]">
                Types of Data Collected
            </PrimaryTextLarge>
            <PrimaryText className="pb-[10]">
                Personal Data
            </PrimaryText>
            <PrimaryText>
                While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
            </PrimaryText>
            
            <View style={{ padding: 10 }}>
            {
                data2.map((item, index) => (
                    <View className="flex flex-row pr-[20]" style={{ marginBottom: 10 }} key={index}>
                        <View className="flex-row">
                            <View className="items-center mt-[4] mr-[5]">
                                <OctiIcons name="dot-fill" size={15} color="#262259"/>
                            </View>
                            <Text className="text-[17px] font-bold text-[#262259]">{item.key}</Text>
                        </View>
                    </View>
                ))
            }
            </View>
            <PrimaryText className="pb-[10]">
                Usage Data
            </PrimaryText>
            <PrimaryText>
                Usage Data is collected automatically when using the Service.
                {'\n'}{'\n'}
                Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                {'\n'}{'\n'}
                When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.
                {'\n'}{'\n'}
                We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.
                {'\n'}{'\n'}
                Tracking Technologies and Cookies
                {'\n'}
                We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:
            </PrimaryText>
            <View style={{ padding: 10 }}>
            {
                data3.map((item, index) => (
                    <View className="flex flex-row pr-[20]" style={{ marginBottom: 10 }} key={index}>
                        <View className="flex-row">
                            <View className="items-center mt-[4] mr-[5]">
                                <OctiIcons name="dot-fill" size={15} color="#262259"/>
                            </View>
                        </View>
                        <View className="flex-row flex-1 ml-[4]">
                            <Text className="text-[17px] font-bold text-[#262259]">{item.key}<Text className="text-[17px] flex-wrap text-[#262259]">{item.data}</Text></Text>
                        </View>
                    </View>
                ))
            }
            </View>
            <PrimaryText className="pb-[4]">
                Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser. Learn more about cookies: Cookies: What Do They Do?.
                {'\n'}{'\n'}
                We use both Session and Persistent Cookies for the purposes set out below:
            </PrimaryText>
            <View style={{ padding: 10 }}>
            {
                data4.map((item, index) => (
                    <View className="flex flex-row pr-[20]" style={{ marginBottom: 10 }} key={index}>
                        <View className="flex-row">
                            <View className="items-center mt-[4] mr-[5]">
                                <OctiIcons name="dot-fill" size={15} color="#262259"/>
                            </View>
                        </View>
                        <View className="flex-1 flex-col">
                            <View className="flex-row">
                                <Text className="text-[17px] font-bold text-[#262259]">{item.key1}</Text>
                            </View>
                            <View className="flex-row">
                                <Text className="text-[17px] text-[#262259]">{item.key2}</Text>
                            </View>
                            <View className="flex-row">
                                <Text className="text-[17px] text-[#262259]">{item.key3}</Text>
                            </View>
                            <View className="flex-row ml-[4]">
                                <Text className="text-[17px] flex-wrap text-[#262259]">{item.data}</Text>
                            </View>
                        </View>
                    </View>
                ))
            }
            </View>
            <PrimaryText className="pb-[10]">
                For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.
                {'\n'}
            </PrimaryText>
            <PrimaryTextLarge className="pb-[10]">
                Use of Your Personal Data
            </PrimaryTextLarge>
            <PrimaryText>
                The Company may use Personal Data for the following purposes:
            </PrimaryText>
            <View style={{ padding: 10 }}>
            {
                data5.map((item, index) => (
                    <View className="flex flex-row pr-[20]" style={{ marginBottom: 10 }} key={index}>
                        <View className="flex-row">
                            <View className="items-center mt-[4] mr-[5]">
                                <OctiIcons name="dot-fill" size={15} color="#262259"/>
                            </View>
                        </View>
                        <View className="flex-row flex-1 ml-[4]">
                            <Text className="text-[17px] font-bold text-[#262259]">{item.key}<Text className="text-[17px] flex-wrap text-[#262259]">{item.data}</Text></Text>
                        </View>
                    </View>
                ))
            }
            </View>
            <PrimaryTextLarge className="pb-[10] pt-[10]">
                Retention of Your Personal Data
            </PrimaryTextLarge>
            <PrimaryText className="pb-[10]">
                The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
                {'\n'}{'\n'}
                The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.
            </PrimaryText>
            <PrimaryTextLarge className="pb-[10] pt-[10]">
                Transfer of Your Personal Data
            </PrimaryTextLarge>
            <PrimaryText className="pb-[10]">
                Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.
                {'\n'}{'\n'}
                Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.
                {'\n'}{'\n'}
                The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.
            </PrimaryText>
            <PrimaryTextLarge className="pb-[10] pt-[10]">
                Disclosure of Your Personal Data
            </PrimaryTextLarge>
            <PrimaryText className="pb-[4]">
                Business Transactions{'\n'}
                If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.
                {'\n'}{'\n'}
                Law enforcement
                {'\n'}
                Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).
                {'\n'}{'\n'}
                Other legal requirements
                {'\n'}
                The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:
            </PrimaryText>

            <View style={{ padding: 10 }}>
            {
                data6.map((item, index) => (
                    <View className="flex flex-row pr-[20]" style={{ marginBottom: 10 }} key={index}>
                        <View className="flex-row">
                            <View className="items-center mt-[4] mr-[5]">
                                <OctiIcons name="dot-fill" size={15} color="#262259"/>
                            </View>
                        </View>
                        <View className="flex-row flex-1 ml-[4]">
                            <Text className="text-[17px] flex-wrap text-[#262259]">{item.data}</Text>
                        </View>
                    </View>
                ))
            }
            </View>
            <PrimaryTextLarge className="pb-[4]">
                Security of Your Personal Data
            </PrimaryTextLarge>
            <PrimaryText className="pb-[10]">
                The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
            </PrimaryText>
            <PrimaryTextLarge className="pb-[10] pt-[10]">
                Children's Privacy
            </PrimaryTextLarge>
            <PrimaryText className="pb-[10]">
                Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.
                {'\n'}{'\n'}
                If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.
            </PrimaryText>
            <PrimaryTextLarge className="pb-[10] pt-[10]">
                Links to Other Websites
            </PrimaryTextLarge>
            <PrimaryText className="pb-[10]">
                Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.
                {'\n'}{'\n'}
                We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
            </PrimaryText>
            <PrimaryTextLarge className="pb-[10] pt-[10]">
                Changes to this Privacy Policy
            </PrimaryTextLarge>
            <PrimaryText className="pb-[10]">
                We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
                {'\n'}{'\n'}
                We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.
                {'\n'}{'\n'}
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </PrimaryText>
            <PrimaryTextLarge className="pb-[10] pt-[10]">
                Children's Privacy
            </PrimaryTextLarge>
            <View style={{ padding: 10 }}>
                <View className="flex flex-row pr-[20]" style={{ marginBottom: 10 }}>
                    <View className="flex-row">
                        <View className="items-center mt-[4] mr-[5]">
                            <OctiIcons name="dot-fill" size={15} color="#262259"/>
                        </View>
                    </View>
                    <View className="flex-row flex-1 ml-[4]">
                        <Text className="text-[17px] flex-wrap text-[#262259]">By email: contact@fablefrog.com</Text>
                    </View>
                </View>
            </View>
            <View className="h-[150]"/>
        </ScrollView>
    </View>
    <FableNavigation/>
    </>
    )
}

const data1=[
    { key :'Account', data : ' means a unique account created for You to access our Service or parts of our Service.'},
    { key :'Company', data : ' (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to WeQuestion, Sydney.'},
    { key :'Cookies', data : ' are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.'},
    { key :'Country', data : ' refers to: Australian Capital Territory, Australia'},
    { key :'Device', data : ' means any device that can access the Service such as a computer, a cellphone or a digital tablet.'},
    { key :'Personal Data', data : ' is any information that relates to an identified or identifiable individual.'},
    { key :'Service', data : ' refers to the Website.'},
    { key :'Service Provider', data : ' means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.'},
    { key :'Usage Data', data : ' refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).'},
    { key :'Website', data : ' refers to WeQuestion, accessible from https://wequestion.wiki/'},
    { key :'You', data : 'means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.'}
];

const data2=[
    {key : 'Email address'}, {key : 'First name and last name'}, {key : 'Phone number'}, {key : 'Usage Data'}
];

const data3=[
    { key :'Cookies or Browser Cookies.', data : ' A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.'},
    { key :'Flash Cookies.', data : ' Certain features of our Service may use local stored objects (or Flash Cookies) to collect and store information about Your preferences or Your activity on our Service. Flash Cookies are not managed by the same browser settings as those used for Browser Cookies. For more information on how You can delete Flash Cookies, please read "Where can I change the settings for disabling, or deleting local shared objects?" available at https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_'},
    { key :'Web Beacons.', data : ' Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).'},
];

const data4=[
    { key1 :'Necessary / Essential Cookies', key2 : 'Session Cookies', key3 : 'Administered by: Us', data : 'Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.'},
    { key1 :'Cookies Policy / Notice Acceptance Cookies', key2 : 'Persistent Cookies', key3: 'Administered by: Us', data : 'Purpose: These Cookies identify if users have accepted the use of cookies on the Website.'},
    { key1 :'Functionality Cookies', key2 : 'Persistent Cookies', key3 : 'Administered by: Us', data : 'Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.'}
];

const data5=[
    { key :'With Service Providers:', data : ' We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.'},
    { key :'For business transfers:', data : ' We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.'},
    { key :'With Affiliates:', data : ' We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.'},
    { key :'With business partners:', data : ' We may share Your information with Our business partners to offer You certain products, services or promotions.'},
    { key :'With other users:', data : ' when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.'},
    { key :'With Your consent:', data : ' We may disclose Your personal information for any other purpose with Your consent.'}
];

const data6 = [
    { data : 'Comply with a legal obligation'},
    { data : 'Protect and defend the rights or property of the Company'},
    { data : 'Prevent or investigate possible wrongdoing in connection with the Service'},
    { data : 'Protect the personal safety of Users of the Service or the public'},
    { data : 'Protect against legal liability'},
]