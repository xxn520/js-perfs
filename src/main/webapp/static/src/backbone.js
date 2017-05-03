/**
 * Created by m2mbob on 2017/5/3.
 */
import jsPerfs from './js-perfs'

const Database = Backbone.Model.extend({
    idAttribute: 'dbname',
    constructor: function(attrs, options) {
        this.sample = new Backbone.Model()
        this.queries = new Queries()

        Backbone.Model.call(this, attrs, options)
    },
    parse: function(data) {
        const sample = data.lastSample
        const queries = sample.topFiveQueries
        this.sample.set({
            countClassName: sample.countClassName,
            length: sample.nbQueries
        })
        this.queries.set(queries, { parse: true })
        return { dbname: data.dbname }
    }
})

const Query = Backbone.Model.extend({
    parse: function(data) {
        if (!data.query) {
            data.formatElapsed = ''
            data.elapsedClassName = ''
        }
        return data
    }
})

const Queries = Backbone.Collection.extend({
    model: Query,
    parse: function(queries) {
        for (var i = 0; i < queries.length; i++) {
            queries[i].id = i
        }
        return queries
    }
})

const SampleView = Backbone.View.extend({
    template: _.template(
        '<span class="<%= data.countClassName %>"><%= data.length %></span>',
        { variable: 'data' }
    ),
    initialize: function() {
        this.listenTo(this.model, 'change:countClassName', this.updateCountClassName)
        this.listenTo(this.model, 'change:length', this.updateLength)
    },
    render: function() {
        this.$el.html(this.template(this.model.attributes));
        this.$count = this.$('span')
        return this
    },
    updateCountClassName: function(model, name) {
        this.$count.attr('class', name)
    },
    updateLength: function(model, length) {
        this.$count.text(length)
    }
})

const DatabaseView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template([
        '<td class="dbname"><%= db.dbname %></td>',
        '<td class="query-count"></td>'
    ].join(''), { variable: 'db' }),
    render: function() {
        this.$el.html(this.template(this.model.attributes));
        const sampleView = new SampleView({
            el: this.$('.query-count'),
            model: this.model.sample
        });
        const queriesView = new QueriesView({
            el: this.$el,
            collection: this.model.queries
        })
        sampleView.render()
        queriesView.render()
        return this
    }
})

const DatabasesView = Backbone.View.extend({
    tagName: 'table',
    className: 'table table-striped latest-data',
    template: _.template('<tbody id="table"></tbody>'),
    initialize: function() {
        this.listenTo(this.collection, 'add', this.addOne)
    },
    addOne: function(model) {
        var mv = new DatabaseView({ model: model })
        this.appendModelView(mv.render())
    },
    render: function() {
        this.$el.html(this.template())
        this.$table = this.$('#table')
        this.collection.each(this.addOne, this)
        return this
    },
    appendModelView: function(mv) {
        this.$table.append(mv.el)
    }
})

const QueryView = Backbone.View.extend({
    tagName: 'td',
    template: _.template([
        '<%= q.formatElapsed || "" %>',
        '<div class="popover left">',
        '<div class="popover-content">',
        '<%= q.query || "" %>',
        '</div>',
        '<div class="arrow"></div>',
        '</div>',
    ].join(''), { variable: 'q' }),
    initialize: function() {
        this.listenTo(this.model, 'change:elapsedClassName', this.updateClassName)
        this.listenTo(this.model, 'change:formatElapsed', this.updateElapsed)
        this.listenTo(this.model, 'change:query', this.updateQuery)
    },
    render: function() {
        this.$el.attr('class', this.model.get('elapsedClassName')).html(this.template(this.model.attributes))
        this.$query = this.$('.popover-content')
        return this;
    },
    updateClassName: function(model, className) {
        this.$el.attr('class', className)
    },
    updateElapsed: function(model, elapsed) {
        const node = this.el.firstChild
        if (node.nodeType === 3) {
            node.textContent = elapsed
        } else {
            const elapsedNode = document.createTextNode(elapsed)
            this.el.insertBefore(elapsedNode, node)
        }
    },
    updateQuery: function(model, query) {
        this.$query.text(query)
    }
});

const QueriesView = Backbone.View.extend({
    initialize: function() {
        this.listenTo(this.collection, 'add', this.addOne);
    },
    addOne: function(model) {
        var mv = new QueryView({ model: model });

        this.appendModelView(mv.render());
    },
    render: function() {
        this.collection.each(this.addOne, this);
        return this;
    },
    appendModelView: function(mv) {
        this.$el.append(mv.el);
    }
});


const databases = new Backbone.Collection([], {
    model: Database
})

const databasesView = new DatabasesView({
    collection: databases
});

databasesView.render()

const update = function () {
    databases.set(ENV.generateData().toArray(), { parse: true })
    jsPerfs.monitor.syncUi()
    setTimeout(update, ENV.timeout)
}

$('#app').append(databasesView.el)
update()
