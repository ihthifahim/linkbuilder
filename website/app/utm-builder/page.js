
import UtmBuilderComponent from "../components/UtmBuilder"

export const metadata = {
    metadataBase: new URL('https://gumly.co'),
    title: 'Campaign URL Builder - Gumly ',
    description: "Discover the power of UTM parameters with Gumly's Campaign URL Builder. Enhance your online campaigns, track user habits, and optimize your marketing strategy for success.",
    keywords: ['UTM parameters', 'Campaign URL Builder', 'Urchin Tracking Module', 'Online marketing tools',
               'Google Analytics tracking', 'Smart campaign tracking', 'User habits analysis','Ad optimization', 'Content strategy', 'Marketing insights' ],
    openGraph: {
      images: '/previewimage.png'
    }
  }

export default function UTMBuilder(){
    return (
        <>
        <div className="container mx-auto px-5 py-10">
            <UtmBuilderComponent />

            <div className="mt-10 text-white w-2/6 mx-auto text-balance">
                <p className="mt-5">Ever wondered how to make your online marketing efforts more effective? Well, the secret lies in understanding UTM parameters! 
                    UTM, short for Urchin Tracking Module, is a fancy term for codes you add to your web links. These codes help track how well 
                    your online campaigns are doing in Google Analytics, giving you loads of useful info. In this article, we'll break down what 
                    UTM parameters are and show you how they can supercharge your team's decision-making for success.
                </p>

                <h1 className="mt-10 font-bold text-3xl text-purple-500">What Are UTM Parameters?</h1>
                    <p className="mt-5">
                    So, what's the deal with UTM parameters? They're like little tags you add to the end of your web links. These tags hold information about where your website traffic is coming from and how well your marketing campaigns are performing. For example:
                    <span className="block mt-5 text-md italic font-bold whitespace-normal break-words">https://yourwebsite.com/page?utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term=keyword&utm_content=ad_variant</span>
                    </p>
                <h1 className="mt-10 font-bold text-3xl text-purple-500">How UTM Parameters Help Your Team</h1>
                <ul className="">
                    <li className="mb-2 mt-5 text-purple-300 font-bold text-lg">Smart Campaign Tracking:</li>
                    <p>With UTM parameters, you can break down your online campaigns into tiny bits. Find out which sources, mediums, and campaigns are bringing in the most traffic.</p>
                    <li className="mb-2 mt-5 text-purple-300 font-bold text-lg">Understanding User Habits:</li>
                    <p>UTM tags help you figure out what users are up to. Discover which channels are most popular, understand the impact of certain keywords, and tweak your strategies based on real data.</p>
                    <li className="mb-2 mt-5 text-purple-300 font-bold text-lg">Saving Money on Ads:</li>
                    <p>If your team handles paid ads, UTM parameters are gold. Figure out which ads are working best, know where your audience hangs out, and use your budget wisely.</p>
                    <li className="mb-2 mt-5 text-purple-300 font-bold text-lg">Crafting Awesome Content:</li>
                    <p>UTM parameters let you measure how well different content pieces are doing. Test out different emails or ad designs, see what works, and improve your content game.</p>
                </ul>

                <h1 className="mt-10 font-bold text-3xl text-purple-500">How to Use UTM Parameters Like a Pro</h1>
                <p className="mt-5">To make the most of UTM parameters, keep things simple and consistent. Use the same tagging style across your team. There are handy online tools to create these tags for you. Check your Google Analytics reports regularly to see what's happening, and use that info to make your marketing even better.
                    In a nutshell, UTM parameters are like magic codes that give your team superpowers. By using them, you'll have all the data you need to make smart decisions, stay ahead of the competition, and watch your team's success skyrocket!</p>
            </div>
        </div>
        </>
    )
}