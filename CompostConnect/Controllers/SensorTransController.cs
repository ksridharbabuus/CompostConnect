using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.OData;
using Microsoft.WindowsAzure.Mobile.Service;
using CompostConnect.DataObjects;
using CompostConnect.Models;

namespace CompostConnect.Controllers
{
    public class SensorTransController : TableController<SensorTrans>
    {
        protected override void Initialize(HttpControllerContext controllerContext)
        {
            base.Initialize(controllerContext);
            MobileServiceContext context = new MobileServiceContext();
            DomainManager = new EntityDomainManager<SensorTrans>(context, Request, Services);
        }

        // GET tables/SensorTrans
        public IQueryable<SensorTrans> GetAllSensorTrans()
        {
            return Query(); 
        }

        // GET tables/SensorTrans/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public SingleResult<SensorTrans> GetSensorTrans(string id)
        {
            return Lookup(id);
        }

        // PATCH tables/SensorTrans/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public Task<SensorTrans> PatchSensorTrans(string id, Delta<SensorTrans> patch)
        {
             return UpdateAsync(id, patch);
        }

        // POST tables/SensorTrans
        public async Task<IHttpActionResult> PostSensorTrans(SensorTrans item)
        {
            SensorTrans current = await InsertAsync(item);
            return CreatedAtRoute("Tables", new { id = current.Id }, current);
        }

        // DELETE tables/SensorTrans/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public Task DeleteSensorTrans(string id)
        {
             return DeleteAsync(id);
        }

    }
}