"use client";
import { useState } from "react";
import {
  Plus,
  Search,
  GripVertical,
  MoreHorizontal,
  ImagePlus,
  Trash2,
  X,
  ChevronDown,
  ListFilter,
  Coffee,
} from "lucide-react";
import { useLab } from "@/lib/lab-context";
import { categories, formatMoney, type MenuItem } from "@/lib/mock-data";
import {
  Button,
  Badge,
  PageHeader,
  Input,
  Select,
  Textarea,
  Toggle,
  Drawer,
  ConfirmationDialog,
  EmptyState,
  ResourceList,
  ResourceRow,
  IconButton,
} from "./ui";
export function ContentEditor({
  item,
  onClose,
  onSave,
  onDelete,
  isNew = false,
}: {
  item: MenuItem | null;
  onClose: () => void;
  onSave: (v: MenuItem) => void;
  onDelete: (v: MenuItem) => void;
  isNew?: boolean;
}) {
  const [draft, setDraft] = useState(item);
  const [confirm, setConfirm] = useState(false);
  const set = <K extends keyof MenuItem>(key: K, value: MenuItem[K]) =>
    setDraft((prev) => (prev ? { ...prev, [key]: value } : prev));
  return (
    <>
      <Drawer
        open={!!item}
        onClose={onClose}
        title={isNew ? "Add menu item" : "Edit menu item"}
        footer={
          <>
            <Button
              variant="ghost"
              className="delete-action"
              disabled={isNew}
              onClick={() => setConfirm(true)}
            >
              <Trash2 size={15} />
              Delete
            </Button>
            <div className="inline">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" form="menu-item-form">
                {isNew ? "Add item" : "Save changes"}
              </Button>
            </div>
          </>
        }
      >
        {draft && (
          <form
            id="menu-item-form"
            onSubmit={(e) => {
              e.preventDefault();
              onSave({
                ...draft,
                name: draft.name.trim(),
                description: draft.description.trim(),
              });
            }}
            className="editor-form"
          >
            <div className="editor-eyebrow">
              <span className="mini-icon">
                <Coffee size={14} />
              </span>
              MENU ITEM<span>Changes appear on your page</span>
            </div>
            <Input
              label="Name"
              value={draft.name}
              required
              maxLength={100}
              onChange={(e) => set("name", e.target.value)}
              autoFocus
              placeholder="e.g. Cappuccino"
            />
            <Textarea
              label="Description"
              value={draft.description}
              rows={3}
              maxLength={500}
              onChange={(e) => set("description", e.target.value)}
              placeholder="A little detail goes a long way."
            />
            <div className="field-pair">
              <Input
                label="Price ($)"
                type="number"
                value={draft.price}
                required
                min="0"
                max="99999"
                step="0.01"
                onChange={(e) => set("price", Number(e.target.value))}
              />
              <Select
                label="Availability"
                value={draft.available ? "Available" : "Sold out"}
                onChange={(e) =>
                  set("available", e.target.value === "Available")
                }
              >
                <option>Available</option>
                <option>Sold out</option>
              </Select>
            </div>
            <Select
              label="Category"
              value={draft.category}
              onChange={(e) => set("category", e.target.value)}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
            <div className="field">
              <label htmlFor="item-photo">
                Photo<span className="optional">Optional</span>
              </label>
              <div
                className={`photo-uploader ${draft.image ? "has-image" : ""}`}
              >
                {draft.image ? (
                  <>
                    <img src={draft.image} alt={draft.name || "Menu photo"} />
                    <div>
                      <strong>Looking good.</strong>
                      <p className="meta muted">
                        A great photo makes it easier to choose.
                      </p>
                      <label htmlFor="item-photo" className="text-link">
                        Change photo
                      </label>
                    </div>
                    <IconButton
                      label="Remove photo"
                      type="button"
                      onClick={() => set("image", undefined)}
                    >
                      <X size={15} />
                    </IconButton>
                  </>
                ) : (
                  <label htmlFor="item-photo">
                    <ImagePlus size={22} />
                    <strong>Add a photo</strong>
                    <span>JPG, PNG or WebP</span>
                  </label>
                )}
                <input
                  id="item-photo"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => set("image", String(reader.result));
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
            </div>
            <div className="editor-visibility">
              <Toggle
                label="Visible on page"
                description="Customers can see this item on your menu."
                checked={draft.visible}
                onChange={(v) => set("visible", v)}
              />
            </div>
          </form>
        )}
      </Drawer>
      <ConfirmationDialog
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={() => {
          if (item) onDelete(item);
          setConfirm(false);
        }}
        title="Delete this menu item?"
        description={`${draft?.name || "This item"} will be removed from your menu. You can add it again any time.`}
      />
    </>
  );
}
export default function ContentPage() {
  const { items, setItems, notify } = useLab();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All statuses");
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [editorKey, setEditorKey] = useState(0);
  const edit = (item: MenuItem, newItem = false) => {
    setIsNew(newItem);
    setEditing(item);
    setEditorKey((k) => k + 1);
  };
  const filtered = items.filter(
    (item) =>
      (item.name + " " + item.description)
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (filter === "All statuses" ||
        (filter === "Available" && item.available && item.visible) ||
        (filter === "Sold out" && !item.available) ||
        (filter === "Hidden" && !item.visible)),
  );
  return (
    <>
      <PageHeader
        title="Content"
        description="Manage what customers see on your menu."
        actions={
          <Button
            onClick={() =>
              edit(
                {
                  id: `local-${Date.now()}`,
                  name: "",
                  description: "",
                  price: 0,
                  category: "Breakfast",
                  available: true,
                  visible: true,
                },
                true,
              )
            }
          >
            <Plus size={16} />
            Add item
          </Button>
        }
      />
      <section className="content-surface">
        <div className="content-toolbar">
          <div className="search-input">
            <Search size={16} />
            <input
              aria-label="Search menu items"
              placeholder="Search menu items…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <IconButton label="Clear search" onClick={() => setSearch("")}>
                <X size={14} />
              </IconButton>
            )}
          </div>
          <div className="filter-select">
            <ListFilter size={15} />
            <Select
              aria-label="Filter by status"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {["All statuses", "Available", "Sold out", "Hidden"].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </Select>
          </div>
        </div>
        <div className="content-table-meta">
          <span>
            {search || filter !== "All statuses"
              ? `${filtered.length} of ${items.length} items`
              : `${items.length} menu items`}
          </span>
          <span>
            Price<span>Status</span>
          </span>
        </div>
        {categories.map((category) => {
          const group = filtered.filter((i) => i.category === category);
          if (!group.length) return null;
          return (
            <section key={category} className="content-group">
              <header>
                <div className="inline">
                  <ChevronDown size={15} />
                  <h2>{category}</h2>
                  <span className="meta muted">{group.length} items</span>
                </div>
                <button
                  className="text-link"
                  onClick={() =>
                    edit(
                      {
                        id: `local-${Date.now()}`,
                        name: "",
                        description: "",
                        price: 0,
                        category,
                        available: true,
                        visible: true,
                      },
                      true,
                    )
                  }
                  aria-label={`Add item to ${category}`}
                >
                  <Plus size={15} />
                  <span>Add item</span>
                </button>
              </header>
              <ResourceList label={`${category} menu items`}>
                {group.map((item) => (
                  <ResourceRow
                    key={item.id}
                    label={`Edit ${item.name}`}
                    onClick={() => edit(item)}
                  >
                    <GripVertical className="drag-handle" size={15} />
                    {item.image ? (
                      <img className="resource-photo" src={item.image} alt="" />
                    ) : (
                      <span className="resource-photo photo-placeholder">
                        <Coffee size={18} />
                      </span>
                    )}
                    <span className="resource-info">
                      <strong>{item.name}</strong>
                      <span>{item.description}</span>
                    </span>
                    <span className="resource-price">
                      {formatMoney(item.price)}
                    </span>
                    <span className="resource-status">
                      <Badge
                        tone={
                          !item.visible
                            ? "neutral"
                            : item.available
                              ? "success"
                              : "warning"
                        }
                      >
                        <span className="status-dot" />
                        {!item.visible
                          ? "Hidden"
                          : item.available
                            ? "Available"
                            : "Sold out"}
                      </Badge>
                    </span>
                    <MoreHorizontal className="resource-more" size={18} />
                  </ResourceRow>
                ))}
              </ResourceList>
            </section>
          );
        })}
        {filtered.length === 0 && (
          <EmptyState
            title="No items found"
            description="Try a different search or change the status filter."
            action={
              <Button
                variant="secondary"
                onClick={() => {
                  setSearch("");
                  setFilter("All statuses");
                }}
              >
                Clear filters
              </Button>
            }
          />
        )}
        <div className="content-end">
          <span className="status-dot live-dot" />
          Your latest menu, always at the same link.
        </div>
      </section>
      <ContentEditor
        key={editorKey}
        item={editing}
        isNew={isNew}
        onClose={() => setEditing(null)}
        onSave={(item) => {
          setItems((prev) =>
            isNew
              ? [...prev, item]
              : prev.map((i) => (i.id === item.id ? item : i)),
          );
          setEditing(null);
          notify(isNew ? "Menu item added" : "Menu item updated");
        }}
        onDelete={(item) => {
          setItems((prev) => prev.filter((i) => i.id !== item.id));
          setEditing(null);
          notify("Menu item deleted");
        }}
      />
    </>
  );
}
