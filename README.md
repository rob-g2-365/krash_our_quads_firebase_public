# Krash our Quads - VTX Frequency Configuration App

## Languages/Libraries used.
* HTML
* Javascript
* CSS
* Firebase/Firestore
* Visual Studio Code
* Node.js
	
## How to deploy the application

Most of steps are in the [Firebase - Ultimate Beginner's Guide Video](https://www.youtube.com/watch?v=9kRgVxULbag).

### Global Tools install.

Install the following tools:

* [Install Visual Studio Code](https://code.visualstudio.com/download)
* [Install Node.js](https://nodejs.org/en/download)
 
### Visual Studio Setup

Initialize the firebase tools globally.

```console
> npm install firebase-tools -g 
```
 
### Create Firebase Project. 

In the Visual Studio Code terminal type the following.

```console
> firebase init hosting.
```

Select Create a new project.
```console
=== Project Setup

Please select an option.
? Please select an option:
  Use an existing project
> Create a new project
  Add Firebase to an existing Google Cloud Platform project
  Don't set up a default project
```
  
The unique id doesn't matter to much.
```console
? Please specify a unique project id (warning: cannot be modified afterward) [6-30 characters]:
```

Keep in mind that this contains the name of the web link when deployed.
```console
? What would you like to call your project? 
```

Just use the default which is public.
```console
? What do you want to use as your public directory? (public) 
```

Select yes.
```console
? Configure as a single-page app (rewrite all urls to /index.html)? (y/N) y
```

I selected no here.
```console
? Set up automatic builds and deploys with GitHub? No
```

The terminal will show how to log into the firebase console.
```console
Firebase console is available at
https://console.firebase.google.com/project/xxxxxx/overview
```

Verify that the following files have been created.
```console
> dir
	.firebaserc
	firebase.json
	public/index.html
```

### Copy application project files

Copy over the files in this Github repository to the Visual Studio Code project directory.  Note that index.html will be replaced.

### Log into the Firebase console and change the read/write permissions.

Perform the following steps:

* Log into the Firebase console.
* Click on **Cloud Firestore**
* Click on **Create Database**
* Select **Start in Test Mode**
* Go to the Firestore Database Rules Table.  

Change the permissions from:

```console
  .
  .
  match /{document=**} {
    allow read, write: if request.time < timestamp.date(2025, 3, 14);
  }
  .
  .
```

to 

```console
  .
  .
  match /{document=**} {
    allow read, write: if true;
  }
  .
  .
```


### Testing the Firebase Application.

In the Visual Studio Code terminal type the following.

```console
> firebase serve
```

### Deploying the Firebase Application.

In the Visual Studio Code terminal type the following.

```console
> firebase deploy
```

 
## Additional Resources

* [Firebase - Ultimate Beginner's Guide Video](https://www.youtube.com/watch?v=9kRgVxULbag)
* [Pure CSS Hamburger Menu & Overlay Video](https://www.youtube.com/watch?v=DZg6UfS5zYg)
* [Pure CSS Hamburger Menu & Overlay Code](https://codepen.io/bradtraversy/pen/vMGBjQ)