import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {

  return (
    <div {...useBlockProps.save({ className: 'formo-cheeses-cheeseblock' })}>
      <div className={`formo-cheeses-cheeseblock-cols ${attributes.layout}`}>
        <div className='formo-cheeses-cheeseblock-col'>
          <RichText.Content 
            tagName="h2" 
            value={attributes.title} 
            className='formo-cheeses-cheeseblock-title has-xxxx-large-font-size' 
          />
          <div { ...useBlockProps.save({
            className: 'formo-cheeses-cheeseblock-content'
          }) }>
            <InnerBlocks.Content />
          </div>
        </div>
        <div className='formo-cheeses-cheeseblock-col formo-cheeses-cheeseblock-images'>
          {attributes.imageID && (
            <figure className='formo-cheeses-cheeseblock--image formo-cheeses-cheeseblock--bg-image'>
              <img src={attributes.imageUrl} className="image" data-id={attributes.imageID} />
            </figure>
          )}
        </div>
      </div>
    </div>
  );
}