specialty: 
1) used EventEmitter in BlogService to record the current post and ListComponent subscribed to any change of current post, so that ListComponent can render current post with distinctive color even when we access the edit or list through url. 
2) used 3 tools together: 
        a) save edits within ngOnDestroy of edit component 
        b) subscribe save to activatedRoute 
        c) listen to beforeunload 
   when trying to save the user's update in any circumstances
3) used bootstrap 4 to decorate the web application
4) redirect invalid url to root when handling the error if there's no such url
