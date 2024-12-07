Instructions:

1) Clone the repository.
2) Install this extension to your chrome: https://chromewebstore.google.com/detail/export-cookie-json-file-f/nmckokihipjgplolmcmjakknndddifde?hl=en&pli=1  - it extracts your cookies and saves it to a file so puppeteer can use it.
3) Go to `reddit.com` (make sure you are logged in to your account)
4) Open the extension menu while at reddit and click `"Export cookies as JSON"`
5) It will download a file to your computer with your reddit cookies inside.
6) Copy the content of the file to `cookies.json`
7) Run `npm install` (it will install all the packages needed)
8) Schedule posts in `posts.json` , an example is left there. Add as many posts as you like.
9) In `env.json` settings are saved:

   9.1) testMode - true / false . If true - it will just open a browser and do nothing. Purpose of it is to make sure your proxy is working fine, you can check if it works.

   9.2) proxy - proxy credentials. I would sugges you to buy a static residential proxy for this, or you can try set it to `null`.

   9.3) showActualBrowser - true / false. If true - it will open up a browser everytime posting. It should be left on true unless bot works really well and can be set to false later on.

   9.4) sproutgigsApiKey - I made an automatic promotion too. I will give you a key later, so you can promote the posts yourself through API.

10) In `posts.json` scheduler you need to put this info about each post:

    10.1) `subreddit` - subreddit of the post, need to put just what is after `reddit.com/r/` like `piercedNSFW`

    10.2) `title` - title of the post ^^

    10.3) `link` - link to redgifs

    10.4) `post_at` - when post should be made. Format is important, must be like in the example

    10.5) `upvotes` - how many upvotes to buy on sproutgigs, if 0 ir missing - no promotion. If you decide to boost it, then keep in mind that value cannot be lower than 25.

11) To run the bot - `node index.js` and just keep your PC on.
12) Logs are being saved in `logs` folder, they will also be outputed to your just in case.
