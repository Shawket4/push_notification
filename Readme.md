Read:</br>
1- Create the flutter project // flutter create example</br>
2- Install firebase cli and login from https://firebase.google.com/docs/cli?hl=en&authuser=1#install_the_firebase_cli</br>
3- Create the firebase project and create firebase flutter app from firebase dashboard</br>
4- Run dart pub global activate flutterfire_cli</br>
5- Run flutterfire configure --project=projectname // or get the full command from firebase create flutter instructions.</br>
6- Run flutter pub add firebase_core & flutter pub add firebase_messaging.</br>
7- Add this to your main.dart file:</br>
import 'package:firebase_core/firebase_core.dart';</br>
import 'firebase_options.dart';</br>
</br>
FirebaseMessaging messaging = FirebaseMessaging.instance;</br>
</br>
@pragma('vm:entry-point')</br>
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {}</br>
</br>
void main async () {</br>
    WidgetsFlutterBinding.ensureInitialized();</br>
    await Firebase.initializeApp(</br>
        options: DefaultFirebaseOptions.currentPlatform,</br>
    );</br>
    NotificationSettings settings = await messaging.requestPermission(</br>
    alert: true,</br>
    announcement: false,</br>
    badge: true,</br>
    carPlay: false,</br>
    criticalAlert: false,</br>
    provisional: false,</br>
    sound: true,</br>
  );</br>
</br>
  FirebaseMessaging.onMessage.listen((RemoteMessage message) {});</br>
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);</br>
  await messaging.subscribeToTopic("allDevices");</br>
}</br>
8- Open up the apple developer menu and follow this guide: https://firebase.flutter.dev/docs/messaging/apple-integration/</br>
9- Run the node server and start sending json post requests using any client like postman in this structure: </br>
{</br>
    "message": "yourmessage"</br>
} // Request Body.</br>
10- You should receive the notification on your device.</br>
Note this only works on real devices not simulators.</br>
