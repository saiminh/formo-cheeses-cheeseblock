import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InnerBlocks, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import './editor.scss';

export default function Edit( {attributes, setAttributes} ) {

  const getImageButton = (openEvent) => {
    return (
      <div className="button-container">
        <Button 
          onClick={ openEvent }
          className="button button-large"
        >
          Pick a background image
        </Button>
      </div>
    );
  };

  const [layout, setLayout] = useState(attributes.layout);

  const toggleLayout = () => {
    const newLayout = layout === 'text_left' ? 'text_right' : 'text_left';
    setLayout(newLayout);
    setAttributes({ layout: newLayout }); // Persist the change to attributes
  }

	return (
		<div { ...useBlockProps(
      {className: 'formo-cheeses-cheeseblock'}
    )}>
      <div className={`formo-cheeses-cheeseblock-cols ${layout}`}>
        <div className='formo-cheeses-cheeseblock-col'>
          <RichText
            tagName="h2"
            className='formo-cheeses-cheeseblock-title has-xxxx-large-font-size'
            value={attributes.title}
            onChange={(title) => setAttributes({title})}
            placeholder='Cheese name'
          />
          <div className='formo-cheeses-cheeseblock-content'>
            <InnerBlocks />
          </div>
        </div>
        <div className='formo-cheeses-cheeseblock-col formo-cheeses-cheeseblock-images'>
          <MediaUpload
              onSelect={ media => { setAttributes({ imageID: media.id, imageUrl: media.url }); } }
              type="image"
              value={ attributes.imageID } // make sure to set this from props
              render={ ({ open }) => getImageButton(open) }
          />
          <figure className='formo-cheeses-cheeseblock--image formo-cheeses-cheeseblock--bg-image'>
            { attributes.imageID && <img src={ attributes.imageUrl } className="image" data-id={ attributes.imageID } />}
          </figure>
        </div>
      </div>
      <Button
        className='layout-switcher'
        onClick={ toggleLayout }
        value='Switch layout'
      >
        Switch Layout
      </Button>
		</div>
	);
}
