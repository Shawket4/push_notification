Read:
1- Create the flutter project // flutter create example
2- Install firebase cli and login from https://firebase.google.com/docs/cli?hl=en&authuser=1#install_the_firebase_cli
3- Create the firebase project and create firebase flutter app from firebase dashboard
4- Run dart pub global activate flutterfire_cli
5- Run flutterfire configure --project=projectname // or get the full command from firebase create flutter instructions.
6- Run flutter pub add firebase_core & flutter pub add firebase_messaging
7- Add this to your main.dart file:
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

FirebaseMessaging messaging = FirebaseMessaging.instance;

@pragma('vm:entry-point')
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {}

void main async () {
    WidgetsFlutterBinding.ensureInitialized();
    await Firebase.initializeApp(
        options: DefaultFirebaseOptions.currentPlatform,
    );
    NotificationSettings settings = await messaging.requestPermission(
    alert: true,
    announcement: false,
    badge: true,
    carPlay: false,
    criticalAlert: false,
    provisional: false,
    sound: true,
  );

  FirebaseMessaging.onMessage.listen((RemoteMessage message) {});
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
  await messaging.subscribeToTopic("allDevices");
}
8- Open up the apple developer menu and follow this guide: https://firebase.flutter.dev/docs/messaging/apple-integration/
9- Run the node server and start sending json post requests using any client like postman in this structure: 
{
    "message": "yourmessage"
} // Request Body.
10- You should receive the notification on your device.
Note this only works on real devices not simulators.