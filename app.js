let autos=require('./autos')
let concesionaria = {
   autos: autos,
   buscarAuto: function (patente)
    {
        for (let i=0;i<this.autos.length;i++)
        {
           if (this.autos[i].patente==patente)
           {
               //console.log(this.autos[i]);
              return this.autos[i];
           }
        }
        return null;
    },
  
    
   venderAuto: function (patente)
    {
        let auto=this.buscarAuto(patente);
     if (auto != null)
     {
         auto.vendido=true;
     }
     return auto;
    },

    autosParaLaVenta:function()
    {
       let venta=this.autos.filter(function (elemento)
       {
           return elemento.vendido==false;
       })
       return venta;
    },

    autosNuevos: function()
    {
       let disponibles=this.autosParaLaVenta() 
       
       let cerokm=disponibles.filter(function (elemento)
       {
           return elemento.km <100;
       })
     return cerokm;
     
    },

    listaDeVentas:function()
    {
       let vendidos=this.autos.filter(function(e)
       {
          return e.vendido==true;
       })
       let precios=[];
       
       for (let i=0;i<vendidos.length;i++)
       {
            precios[i]=vendidos[i].precio;
       }
    
       return precios;
    },
    totalDeVentas:function()
    {
    
       let vendidos=this.listaDeVentas();
       let total=0;
       if (vendidos[0] != null)
        {
            total=vendidos.reduce(function(acum,e) {return acum + e; })
        }
   
        console.log(total);
        return total;
    },

    puedeComprar:function(auto,persona)
    {
      if (persona.capacidadDePagoTotal>=auto.precio)
      {
          if(persona.capacidadDePagoEnCuotas>=(auto.precio/auto.cuotas))
          {
          
              return true;
          }
          else 
          {
        
              return false;
          }
      }
      else{
  
          return false;
      }

    },
    autosQuePuedeComprar: function(persona)
    {
        let disponibles=this.autosParaLaVenta();
  
    let posibles=disponibles.filter(function(e)
    {
        return (persona.capacidadDePagoTotal>=e.precio)==true && (persona.capacidadDePagoEnCuotas>=(e.precio/e.cuotas))==true
    });

console.log(posibles);
    return posibles;
    }
}

let persona={
    nombre: "Juan",
    capacidadDePagoEnCuotas: 20000,
    capacidadDePagoTotal: 100000
    }


//concesionaria.venderAuto('JJK116');
//concesionaria.listaDeVentas();
//concesionaria.totalDeVentas();
//concesionaria.puedeComprar(autos[1],persona);
concesionaria.autosQuePuedeComprar(persona);