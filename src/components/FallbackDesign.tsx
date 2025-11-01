'use client'

export default function FallbackDesign() {
  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e293b 0%, #7c3aed 50%, #1e293b 100%)',
        color: 'white',
        padding: '20px'
      }}
    >
      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}
      >
        <h1 
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #ffffff, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          मराठी आरती संग्रह
        </h1>
        
        <p 
          style={{
            fontSize: '1.5rem',
            marginBottom: '2rem',
            opacity: 0.9
          }}
        >
          Marathi Aarti Collection
        </p>

        <div 
          style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            marginBottom: '3rem'
          }}
        >
          <div 
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              padding: '15px 25px',
              borderRadius: '25px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            📚 32 आरती
          </div>
          <div 
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              padding: '15px 25px',
              borderRadius: '25px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            ❤️ 0 आवडत्या
          </div>
        </div>

        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(15px)',
            padding: '30px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            marginBottom: '2rem'
          }}
        >
          <input 
            type="text"
            placeholder="आरती शोधा... (Search aarti...)"
            style={{
              width: '100%',
              padding: '15px 20px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.9)',
              fontSize: '16px',
              marginBottom: '20px'
            }}
          />
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginTop: '2rem'
          }}
        >
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(15px)',
                padding: '25px',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'left'
              }}
            >
              <div 
                style={{
                  height: '3px',
                  background: 'linear-gradient(90deg, #a855f7, #ec4899, #6366f1)',
                  borderRadius: '2px',
                  marginBottom: '20px'
                }}
              />
              <h3 
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  color: 'white'
                }}
              >
                श्री गणेश आरती {i}
              </h3>
              <div 
                style={{
                  background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                  color: 'white',
                  padding: '5px 15px',
                  borderRadius: '15px',
                  fontSize: '0.8rem',
                  display: 'inline-block',
                  marginBottom: '15px'
                }}
              >
                गणेश
              </div>
              <p 
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6',
                  marginBottom: '20px'
                }}
              >
                सुखकर्ता दुःखहर्ता वार्ता विघ्नाची । नुरवी पुरवी प्रेम कृपा जयाची । सर्वांगी सुंदर उटी शेंदूराची । कंठी झळके माळ मुक्ताफळाची ।।
              </p>
              <button 
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                पूर्ण आरती वाचा (Read Full Aarti)
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

