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
    public class SourceSensorMapController : TableController<SourceSensorMap>
    {
        protected override void Initialize(HttpControllerContext controllerContext)
        {
            base.Initialize(controllerContext);
            MobileServiceContext context = new MobileServiceContext();
            DomainManager = new EntityDomainManager<SourceSensorMap>(context, Request, Services);
        }

        // GET tables/SourceSensorMap
        public IQueryable<SourceSensorMap> GetAllSourceSensorMap()
        {
            return Query(); 
        }

        // GET tables/SourceSensorMap/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public SingleResult<SourceSensorMap> GetSourceSensorMap(string id)
        {
            return Lookup(id);
        }

        // PATCH tables/SourceSensorMap/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public Task<SourceSensorMap> PatchSourceSensorMap(string id, Delta<SourceSensorMap> patch)
        {
             return UpdateAsync(id, patch);
        }

        // POST tables/SourceSensorMap
        public async Task<IHttpActionResult> PostSourceSensorMap(SourceSensorMap item)
        {
            SourceSensorMap current = await InsertAsync(item);
            return CreatedAtRoute("Tables", new { id = current.Id }, current);
        }

        // DELETE tables/SourceSensorMap/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public Task DeleteSourceSensorMap(string id)
        {
             return DeleteAsync(id);
        }

    }
}