Instructions:

1) Clone the repository.
2) Install this extension to your chrome: https://chromewebstore.google.com/detail/export-cookie-json-file-f/nmckokihipjgplolmcmjakknndddifde?hl=en&pli=1  - it extracts your cookies and saves it to a file so puppeteer can use it.
3) Go to `reddit.com` (make sure you are logged in to your account)
4) Open the extension menu while at reddit and click `"Export cookies as JSON"`
5) It will download a file to your computer with your reddit cookies inside.
6) Copy the content of the file to `cookies.json`
7) Run `npm install` (it will install all the packages needed)
8) Schedule posts in `schedule.json` , an example is left there.
9) In `env.json` settings are saved:

   9.1) `testMode` - true / false . If true - it will just open a browser and do nothing. Purpose of it is to make sure your proxy is working fine, you can check if it works.

   9.2) `proxy` - proxy credentials. I would sugges you to buy a static residential proxy for this, or you can try set it to `null` and use your VPN (Should work on paper, set `testMode` to `true` to make sure).

   9.3) `showActualBrowser` - true / false. If true - it will open up a browser everytime posting. It should be left on true unless bot works really well and can be set to false later on.

   9.4) `sproutgigsApiKey` - I made an automatic promotion too. I will give you a key later, so you can promote the posts yourself through API.

10) In `schedule.json` scheduler you need to put this info about each post:

    10.1) `subreddit` - subreddit of the post, need to put just what is after `reddit.com/r/` like `piercedNSFW`

    10.2) `titles` - all the titles you can come up with. The more the better

    10.3) `links` - links to redgifs

    10.4) `post_at` - when post should be made. Write an hour in your own timezone.

    10.5) `post_every_n_days` - pause between posts on that subreddit in days. If you want to post it daily - then enter 1. If less often, then how many days to wait accordingly.

    10.6) `upvotes` - how many upvotes to buy on sproutgigs for each of the posts on this subreddit, if 0 no promotion. If you decide to boost it, then keep in mind that value cannot be lower than 25. 

11) To run the bot - `node index.js` and just keep your PC on.
12) Logs are being saved in `logs` folder, they will also be outputed to your just in case.
